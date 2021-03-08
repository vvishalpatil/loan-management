import requests
from pprint import pprint


# res = requests.get(f'http://127.0.0.1:5000/getUserDetails/{2}')
# res = requests.get('http://127.0.0.1:5000/profileInfo', params={'uid': 1})
d = {
    "address": "Dondaicha",
    "date_registered": "Tue, 09 Feb 2021 15:10:16 GMT",
    "dob": "25/09/1998",
    "email": "vishalpatil948@gmail.com",
    "first_name": "hello",
    "gender": "male",
    "last_name": "S Patil",
    "mobile": "8554907837",
    "user_id": 1
}
res = requests.put('http://127.0.0.1:5000/updateUserProfile/1', json=d)

x = 10000/ 12
print(x)

# pprint(res.json())
i = 2
print(f"'{i}'")