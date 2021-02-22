from flask import Flask, json, jsonify, request
from flask_mysqldb import MySQL
from datetime import timedelta, datetime
import calendar
import datetime as date

app = Flask(__name__)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'loan_management'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)


@app.route('/', methods=['GET', 'POST'])
def index():
    cur = mysql.connection.cursor()
    query = "SELECT * FROM user_info"
    cur.execute(query)
    res = cur.fetchall()
    return jsonify({"users": res})


@app.route('/applyForLoan/<int:uid>', methods=['POST'])
def apply_for_loan(uid):
    data = request.json
    total_loan = int(data['loan_amount'])
    loan_type = data['loan_type']
    tenure = int(data['tenure'])
    print(total_loan, tenure, loan_type, uid)
    # to assign interest rate from loan type
    if loan_type == 'Personal Loan':
        interest_rate = 17
    elif loan_type == 'Home Loan':
        interest_rate = 7
    elif loan_type == 'Car Loan':
        interest_rate = 9
    # to calculate monthly installment amount
    installment_amt = round((total_loan + (total_loan * interest_rate * tenure) / 100) / (tenure * 12), 2)

    print(installment_amt)

    # to find First Installment Due date
    today = datetime.today()
    if today.month == 12:
        new_date = date.datetime(today.year + 1, 1, 31)
    else:
        last_day_of_month = calendar.monthrange(today.year, today.month + 1)[1]
        new_date = date.datetime(today.year, today.month + 1, last_day_of_month)
    installment_due_date = new_date.strftime("%Y-%m-%d")
    print(installment_due_date, 'installment date')

    # query to insert into loan table
    try:
        query = '''
                INSERT into loan_info (`user_id`, `loan_type`, `total_loan`, `loan_tenure`,`interest_rate`, `installment_amt`, `installment_due_date`)
                VALUES(%s,%s,%s,%s,%s,%s,%s)
            '''
        values = (str(uid), loan_type, str(total_loan), str(tenure), str(interest_rate), str(installment_amt),
                  installment_due_date)
        cur = mysql.connection.cursor()
        cur.execute(query, values)
        mysql.connection.commit()
        return jsonify({'status': True, 'msg': 'Successfully Applied'})

    except Exception as e:
        return jsonify({'status': False, 'msg': 'something went wrong, Can\'t apply for loan'})


# api to pay and make information changes according to payment in database
@app.route('/payLoan/', methods=['GET'])
def pay_loan():
    uid = request.args.get('uid')
    lid = request.args.get('lid')
    amount = request.args.get('amount')
    print(uid, lid, amount)
    cur = mysql.connection.cursor()

    # to get remaining loan of perticular user
    query1 = '''SELECT paid_loan ,total_loan , installment_due_date
             from loan_info 
             WHERE loan_info.user_id=%s and loan_info.loan_id=%s'''
    # to update remaining loan into database after subtracting payment amount from previous remaining
    query2 = '''
            UPDATE loan_info
            SET paid_loan = %s , tenure_completed = tenure_completed + 1 ,installment_due_date=%s
            WHERE user_id=%s and loan_id=%s
    '''
    query3 = '''
        INSERT into transaction_info (user_id,loan_id, note, paid_amount) 
        VALUES(%s,%s,"installment money " , %s)

        '''
    query4 = '''
             UPDATE loan_info 
             SET loan_status="closed"
             where user_id = %s and loan_id = %s
            
            '''

    cur.execute(query1, (str(uid), str(lid)))
    res1 = cur.fetchone()
    new_paid_loan = int(res1['paid_loan']) + int(amount)  # adding payment amount to paid loan amount
    # code to calculate next installment date
    db_date = res1['installment_due_date']
    date_time_obj = date.datetime.strptime(db_date, '%Y-%m-%d')

    if date_time_obj.month == 12:
        new_installment_date = date.datetime(date_time_obj.year + 1, 1, 31)
    else:
        last_day_of_month_2 = calendar.monthrange(date_time_obj.year, date_time_obj.month + 1)[1]
        new_installment_date = date.datetime(date_time_obj.year, date_time_obj.month + 1, last_day_of_month_2)

    new_due_date = new_installment_date.strftime("%Y-%m-%d")
    print(new_paid_loan)
    if int(res1['total_loan']) == int(new_paid_loan):
        print('loan closed')
        msg = 'loan closed and amount of ' + str(amount) + ' Rs paid'
        cur.execute(query4, (str(uid), str(lid)))

    else:
        msg = 'amount of ' + str(amount) + ' Rs Paid'
    cur.execute(query2, (new_paid_loan, new_due_date, uid, lid))
    # to update transaction information into transaction table

    cur.execute(query3, (str(uid), str(lid), str(amount)))
    mysql.connection.commit()

    return jsonify({'data': [uid, lid, amount], 'msg': msg})


# all user details api for admin dashboard
@app.route('/getUsers', methods=['GET'])
def get_users():
    cur = mysql.connection.cursor()
    # to get all user information
    query1 = "SELECT * FROM user_info, loan_info where user_info.user_id=loan_info.user_id;"
    # to get total remaining loan amount
    query2 = '''
    SELECT sum(paid_loan) as total_recovered , SUM(total_loan) as total_distributed, MAX(loan_tenure - tenure_completed) as tenure
    from loan_info;'''
    try:
        cur.execute(query1)
        res1 = cur.fetchall()
        cur.execute(query2)
        res2 = cur.fetchone()
        if res1 and res2:
            return jsonify({"status": "success", "users": res1, 'loan_summary': res2})
        else:
            return jsonify({"status": "failed", "users": res1, 'loan_summary': res2})
    except Exception as e:
        return jsonify({"message": "something went wrong"})


# API to get the applied no of loans of a particular user
@app.route('/getLoanOptions/<int:uid>')
def get_loan_options(uid):
    try:
        cursor = mysql.connection.cursor()
        cursor.execute('''SELECT loan_type from loan_info 
                                   WHERE user_id = %s;''',
                       str(uid))
        result = cursor.fetchall()
        if result:
            option_list = []
            for option in result:
                option_list.append((option['loan_type']))
            return jsonify({"status": "success", "loan_options": option_list})
        else:
            return jsonify({"status": "fail", "loan_options": null})
    except Exception as e:
        print(e)
        return jsonify({"message": "something went wrong"})


# user information api
@app.route('/getUserLoanDetails/', methods=['GET'])
def get_user_loan_details():
    uid = request.args.get('id')
    loan_type = request.args.get('loantype')
    cursor = mysql.connection.cursor()
    print(loan_type)
    try:
        last_three_transaction = '''
              select tid,note,paid_amount ,date
              from transaction_info,loan_info 
              where loan_info.user_id=%s and loan_info.loan_type=%s and loan_info.loan_id=transaction_info.loan_id 
              order by tid desc limit 3
                    '''

        cursor.execute('''SELECT * FROM user_info AS user, loan_info AS loan 
                            WHERE user.user_id = %s AND loan.loan_type = %s AND user.user_id = loan.user_id;''',
                       (str(uid), loan_type))
        result = cursor.fetchone()
        cursor.execute(last_three_transaction, (uid, loan_type))
        result2 = cursor.fetchall()
        print(result2)
        if result:
            return jsonify({"status": "success", "data": result, 'transaction_history': result2})
        else:
            return jsonify({"status": "fail", "data": result})
    except Exception as e:
        print(e)
        return jsonify({"message": "something went wrong"})


# profile information
@app.route('/getUserProfile/<int:uid>', methods=['GET'])
def profile_info(uid):
    cursor = mysql.connection.cursor()
    try:
        cursor.execute('''SELECT * FROM user_info 
                          WHERE  user_id = %s;''', str(uid))
        result = cursor.fetchone()
        if result:
            return jsonify({"status": "success", "data": result})
        else:
            return jsonify({"status": "fail", "data": result})
    except Exception as e:
        return jsonify({"message": "something went wrong"})


# profile update
@app.route('/updateUserProfile/<int:uid>', methods=['PUT'])
def update_user_profile(uid):
    cursor = mysql.connection.cursor()
    data = request.json
    columns = ', '.join(str(x) for x in data.keys())
    try:
        query = '''UPDATE user_info 
                    SET first_name = %s, last_name = %s,  
                        email = %s, mobile = %s, dob = %s,
                        gender = %s, address = %s
                    WHERE user_id = %s;
                        '''
        values = (data['first_name'], data['last_name'],
                  data['email'], data['mobile'], data['dob'],
                  data['gender'], data['address'], str(uid))
        cursor.execute(query, values)
        mysql.connection.commit()
        return jsonify({"message": "updated successfully"})
    except Exception as e:
        return jsonify({"message": "something went wrong"})


@app.route('/filterSearch/', methods=['GET'])
def filter_search():
    search_type = request.args.get("search_type")
    search_key = request.args.get("search_key")
    cursor = mysql.connection.cursor()
    if search_type == "Name":
        firstname = search_key
        try:
            firstname = search_key.split(" ")[0] + '%'
        except Exception as e:
            print(e)
        lastname = '%'
        try:
            lastname = search_key.split(" ")[1] + '%'
        except Exception as e:
            print(e)

        query = '''SELECT * FROM user_info, loan_info 
                    WHERE user_info.user_id=loan_info.user_id 
                    AND first_name LIKE %s AND last_name LIKE %s;'''
        cursor.execute(query, (firstname, lastname))
        res = cursor.fetchall()
        if res:
            return jsonify({"data": res})
        else:
            return jsonify({"data": "null"})
    # elif search_type == 'ID':
    # elif search_type == 'Loan Amount':
    # elif search_type == 'Loan Paid':
    # elif search_type == 'Loan Remaining':
    # pass


if __name__ == '__main__':
    app.run(debug=True)

# for last three transaction
# select * from (select * from transaction_info order by tid desc limit 3) as trans_history order by tid
