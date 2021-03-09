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


@app.route('/authenticate', methods=['GET', 'POST'])
def authenticate():
    if request.method == 'GET':
        print("get request")

    if request.method == 'POST':
        cursor = mysql.connection.cursor()
        data = request.json
        values = [x.strip() for x in data.values()]
        try:
            cursor.execute('''SELECT user_id FROM user_info 
                                WHERE first_name = %s AND last_name = %s''', (values[0], values[1]))
            result = cursor.fetchone()
            if result is None:
                query = '''INSERT INTO user_info (first_name, last_name, mobile, email, address, gender, dob, user_name, password)
                                VALUES %s;'''
                cursor.execute(query, [values])
                mysql.connection.commit()
                return jsonify({"message": "registered successfully"})
            else:
                return jsonify({"message": "Already Registered"})
        except Exception as e:
            print(e)
            return jsonify({"message": "something went wrong"})


# ----------------------------------------------------Admin Dashboard APIs----------------------------------------------

# API to get the different types of loan applied
@app.route('/getAppliedLoanOptions', methods=['GET'])
def get_applied_loan_options():
    cursor = mysql.connection.cursor()
    query1 = '''SELECT DISTINCT(loan_type) FROM loan_info '''
    query2 = '''
           SELECT sum(paid_loan) as total_recovered , SUM(total_loan) as total_distributed, 
           MAX(loan_tenure - tenure_completed) as tenure
           FROM loan_info ;'''
    cursor.execute(query1)
    result = cursor.fetchall()
    cursor.execute(query2)
    result2 = cursor.fetchone()
    if result and result2:
        loan_options = []
        for option in result:
            loan_options.append(option['loan_type'])
        loan_options.append('All')
        return jsonify({'status': 'success', 'options': loan_options, "loan_summary": result2})
    else:
        return jsonify({'options': "no data"})


# API for List of all user based on the selected loan type
@app.route('/getUsers/', methods=['GET'])
def get_users():
    option = request.args.get('loantype')
    cur = mysql.connection.cursor()
    if option == "All":
        option = '%'
    # to get all user information with the associated loan type
    try:
        cur.execute('''SELECT * FROM user_info, loan_info 
                        WHERE user_info.user_id = loan_info.user_id AND loan_type LIKE %s;''', [option])
        res1 = cur.fetchall()
        if res1:
            return jsonify({"status": "success", "users": res1})
        else:
            return jsonify({"status": "failed", "users": res1})
    except Exception as e:
        print(e)
        return jsonify({"message": "something went wrong"})


@app.route('/getTransactionStatus/', methods=['GET'])
def get_transaction_status():
    value = request.args.get('data')
    print(value, 'params from client')
    year = value.split('-')[0]
    month = value.split('-')[1]
    print('year', year, 'monht', month)
    cursor = mysql.connection.cursor()
    query1 = '''SELECT count(*) as count FROM transaction_info
                        WHERE YEAR(date) = %s AND MONTH(date) = %s and status = %s'''
    res = [0, 0, 0]
    cursor.execute(query1, (year, month, 'green'))
    res[0] = cursor.fetchone()['count']
    cursor.execute(query1, (year, month, 'yellow'))
    res[1] = cursor.fetchone()['count']
    cursor.execute(query1, (year, month, 'red'))
    res[2] = cursor.fetchone()['count']

    print(res)

    if res:
        return jsonify({"data": res, 'range': max(res)})
    else:
        return jsonify({"data": "null", 'range': 10})


# API to filter the data in the Admin Dashboard
@app.route('/filterSearch/', methods=['GET'])
def filter_search():
    search_type = request.args.get("search_type")
    search_key = request.args.get("search_key")
    comparator = request.args.get('comparator')
    loan_type = request.args.get('loantype')
    cursor = mysql.connection.cursor()
    res = ""
    if loan_type == 'All':
        loan_type = '%'
    try:
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
                        AND loan_info.loan_type LIKE %s AND first_name LIKE %s AND last_name LIKE %s;'''
            cursor.execute(query, (loan_type, firstname, lastname))
            res = cursor.fetchall()

        elif search_type == 'User Id':
            query = '''SELECT * FROM user_info, loan_info 
                           WHERE user_info.user_id= %s AND loan_info.loan_type LIKE %s AND user_info.user_id=loan_info.user_id; '''
            cursor.execute(query, (search_key, loan_type))
            res = cursor.fetchall()
            print(res)

        elif search_type == 'Date Issued':
            query = '''SELECT * FROM user_info, loan_info 
                        WHERE user_info.user_id=loan_info.user_id AND loan_info.loan_type Like  \'''' \
                    + loan_type + '\'  AND  DATE(issue_date)' + comparator + ' \'' + search_key + '\''

            print(query)
            print(comparator, search_key)
            cursor.execute(query)
            res = cursor.fetchall()

        elif search_type == 'Date Issued (Range)':
            search_key = '\'' + search_key + '\''
            search_key1 = '\'' + request.args.get('search_key1') + '\''
            print(search_key, ' range part', search_key1)
            query = '''SELECT * FROM user_info, loan_info 
                           WHERE user_info.user_id=loan_info.user_id AND loan_info.loan_type LIKE  \'''' \
                    + loan_type + '\'  AND DATE(issue_date) BETWEEN ' + search_key + ' AND ' + search_key1
            print(query)
            print(comparator, search_key)
            cursor.execute(query)
            res = cursor.fetchall()

        elif search_type == 'Tenure':
            tenure = search_key
            query = '''SELECT * FROM user_info, loan_info 
                                WHERE user_info.user_id=loan_info.user_id 
                                AND loan_info.loan_type LIKE \'''' + loan_type + '\' AND loan_tenure ' \
                    + comparator + '\'' + tenure + '\''
            cursor.execute(query)
            print(query)
            res = cursor.fetchall()
            print(res)

        elif search_type == 'Tenure remaining':
            tenure_remaining = search_key
            query = '''SELECT * FROM user_info, loan_info 
                        WHERE user_info.user_id=loan_info.user_id 
                        AND loan_info.loan_type LIKE \'''' + loan_type + '\' AND ( loan_tenure - tenure_completed )  ' \
                    + comparator + '\'' + tenure_remaining + '\''
            print(query)
            cursor.execute(query)
            res = cursor.fetchall()

        elif search_type == 'Tenure completed':
            tenure_completed = search_key
            query = '''SELECT * FROM user_info, loan_info 
                                   WHERE user_info.user_id=loan_info.user_id AND loan_info.loan_type LIKE \''''\
                    + loan_type + '\' AND tenure_completed ' + comparator + ' \'' + tenure_completed + '\''
            cursor.execute(query)
            res = cursor.fetchall()

        elif search_type == 'Loan Amount':
            query = '''SELECT * FROM user_info, loan_info 
                                   WHERE user_info.user_id=loan_info.user_id  AND loan_info.loan_type LIKE \'''' \
                    + loan_type + '\' AND total_loan ' + comparator + ' ' + search_key
            cursor.execute(query)
            res = cursor.fetchall()

        elif search_type == 'Loan Paid':
            query = '''SELECT * FROM user_info, loan_info 
                                      WHERE user_info.user_id=loan_info.user_id AND loan_info.loan_type LIKE  \'''' \
                    + loan_type + '\' AND paid_loan ' + comparator + ' ' + search_key
            cursor.execute(query)
            res = cursor.fetchall()

        elif search_type == 'Loan Remaining':
            query = '''SELECT * FROM user_info, loan_info 
                                      WHERE user_info.user_id=loan_info.user_id  AND loan_info.loan_type LIKE  \'''' \
                    + loan_type + '\' AND (total_loan - paid_loan ) ' + comparator + ' ' + search_key
            cursor.execute(query)
            res = cursor.fetchall()
        if res:
            return jsonify({"data": res})
        else:
            return jsonify({"data": "null"})
    except Exception as e:
        print(e)


# -----------------------------------------------User Dashboard APIs----------------------------------------------------

@app.route('/applyForLoan/<int:uid>', methods=['POST'])
def apply_for_loan(uid):
    data = request.json
    total_loan = int(data['loan_amount'])
    loan_type = data['loan_type']
    tenure = int(data['tenure'])
    cur = mysql.connection.cursor()
    cur.execute('''SELECT loan_id FROM loan_info 
        WHERE user_id = %s and loan_type = %s and loan_status = 'active' ''', (str(uid), loan_type))
    result = cur.fetchone()
    if result is None:
        print(total_loan, tenure, loan_type, uid)
        # to assign interest rate from loan type
        if loan_type == 'Personal Loan':
            interest_rate = 17
        elif loan_type == 'Home Loan':
            interest_rate = 7
        elif loan_type == 'Car Loan':
            interest_rate = 9
        # to calculate monthly installment amount

        # installment_amt = round((total_loan + (total_loan * interest_rate * tenure) / 100) / (tenure * 12), 2)
        installment_amt = round((total_loan / tenure), 2)

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
            cur.execute(query, values)
            mysql.connection.commit()
            return jsonify({'status': True, 'msg': 'Successfully Applied'})

        except Exception as e:
            return jsonify({'status': False, 'msg': 'something went wrong, Can\'t apply for loan'})
    else:
        return jsonify({'status': False, 'msg': "you have already applied for this loan"})


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
        INSERT into transaction_info (user_id,loan_id, note, paid_amount,status) 
        VALUES(%s,%s,"installment money " , %s,%s)

        '''
    query4 = '''
             UPDATE loan_info 
             SET loan_status="closed"
             where user_id = %s and loan_id = %s

            '''

    cur.execute(query1, (str(uid), str(lid)))
    res1 = cur.fetchone()
    new_paid_loan = float(res1['paid_loan']) + float(amount)  # adding payment amount to paid loan amount
    # to set transaction status
    due_date = date.datetime.strptime(res1['installment_due_date'], '%Y-%m-%d')
    today = date.datetime.now()
    print('------------------------------------------------------')
    print(today, 'day', today.day, 'month', today.month, 'year', today.year)
    print(due_date, 'installment due date ', due_date.day, type(due_date))
    if today.year <= due_date.year:

        if today.month < due_date.month:
            transaction_status = 'green'

        elif today.month == due_date.month:
            if today.day <= 15:
                transaction_status = 'green'
            elif today.day <= due_date.day:
                transaction_status = 'yellow'
            else:
                transaction_status = 'red'

        else:
            transaction_status = 'red'

    else:
        transaction_status = 'red'

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

    cur.execute(query3, (str(uid), str(lid), str(amount), transaction_status))
    mysql.connection.commit()

    return jsonify({'data': [uid, lid, amount], 'msg': msg})


# API to get the applied no of loans of a particular user
@app.route('/getUserLoanOptions/<int:uid>')
def get_user_loan_options(uid):
    try:
        cursor = mysql.connection.cursor()
        cursor.execute('''SELECT loan_type from loan_info 
                                   WHERE user_id = %s AND loan_status = 'active'; ''',
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
              select tid,note,paid_amount ,date ,status
              from transaction_info,loan_info 
              where loan_info.user_id=%s and loan_info.loan_type=%s and loan_info.loan_id=transaction_info.loan_id 
              order by tid desc limit 3
                    '''

        cursor.execute('''SELECT * FROM user_info AS user, loan_info AS loan WHERE user.user_id = %s AND 
        loan.loan_type = %s AND user.user_id = loan.user_id AND loan.loan_status = 'active';''',
                       (str(uid), loan_type))
        result = cursor.fetchone()
        cursor.execute(last_three_transaction, (uid, loan_type))
        result2 = cursor.fetchall()
        print(result)
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


if __name__ == '__main__':
    app.run(debug=True)

