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


@app.route('/payLoan/<int:uid>/<int:amount>', methods=['GET'])
def pay_loan(uid, amount):
    cur = mysql.connection.cursor()
    query1 = '''SELECT remaining_loan 
             from loan_info 
             WHERE loan_info.user_id=%s'''
    query2 = '''
            UPDATE loan_info
            SET remaining_loan = %s
            WHERE user_id=%s
    '''
    cur.execute(query1, str(uid))
    res1 = cur.fetchone()
    new_remaining_loan = int(res1['remaining_loan']) - amount
    print(new_remaining_loan)
    cur.execute(query2, (new_remaining_loan, uid))

    query3 = '''
    INSERT into transaction_info (user_id, note, paid_amount, new_remaining) 
    VALUES(%s,"installment money " , %s,%s)
            
    '''
    cur.execute(query3,(str(uid),str(amount),str(new_remaining_loan)))
    mysql.connection.commit()
    # code to add data in transaction table(uid, tid, timestamp , note, Paid amount , new remaining)
    return jsonify({'data': [uid, amount]})


@app.route('/getUsers', methods=['GET'])
def get_users():
    cur = mysql.connection.cursor()
    query1 = "SELECT * FROM user_info, loan_info where user_info.user_id=loan_info.user_id;"
    query2 = "SELECT sum(paid_loan) as total_paid , SUM(remaining_loan) as total_remaining from loan_info;"

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


@app.route('/getUserDetails/<int:uid>', methods=['GET'])
def get_user_details(uid):
    cursor = mysql.connection.cursor()
    try:
        cursor.execute('''SELECT * FROM user_info AS user, loan_info AS loan 
                        WHERE user.user_id = %s AND user.user_id = loan.user_id;''', str(uid))
        result = cursor.fetchone()
        if result:
            return jsonify({"status": "success", "data": result})
        else:
            return jsonify({"status": "fail", "data": result})
    except Exception as e:
        return jsonify({"message": "something went wrong"})


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
