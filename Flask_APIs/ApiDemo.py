from flask import Flask, json, jsonify, request
from flask_mysqldb import MySQL

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


# api to pay and make information changes according to payment in database
@app.route('/payLoan/<int:uid>/<int:lid>/<int:amount>', methods=['GET'])
def pay_loan(uid, lid, amount):
    cur = mysql.connection.cursor()
    # to get remaining loan of perticular user
    query1 = '''SELECT paid_loan ,total_loan 
             from loan_info 
             WHERE loan_info.user_id=%s and loan_info.loan_id=%s'''
    # to update remaining loan into database after subtracting payment amount from previous remaining
    query2 = '''
            UPDATE loan_info
            SET paid_loan = %s , tenure_completed = tenure_completed + 1
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
    new_paid_loan = int(res1['paid_loan']) + amount  # adding payment amount to paid loan amount

    print(new_paid_loan)
    if int(res1['total_loan']) == int(new_paid_loan):
        print('loan closed')
        msg = 'loan closed and amount of ' + str(amount) + ' Rs paid'
        cur.execute(query4, (str(uid), str(lid)))

    else:
        msg = 'amount of ' + str(amount) + ' Rs Paid'
    cur.execute(query2, (new_paid_loan, uid, lid))
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
    # loan_type = loan_type.split(' ')[0].lower()
    cursor = mysql.connection.cursor()
    print(loan_type)
    try:
        cursor.execute('''SELECT * FROM user_info AS user, loan_info AS loan 
                            WHERE user.user_id = %s AND loan.loan_type = %s AND user.user_id = loan.user_id;''',
                       (str(uid), loan_type))
        result = cursor.fetchone()
        if result:
            return jsonify({"status": "success", "data": result})
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
