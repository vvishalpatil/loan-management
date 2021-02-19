from datetime import timedelta, datetime
import calendar
import datetime as date

# To calculate installment date for the first time when user applies for the loan
today = datetime.today()
last_day_of_month = calendar.monthrange(today.year, today.month + 1)[1]
print(last_day_of_month)
if today.month == 12:
    new_date = date.datetime(today.year+1,1, last_day_of_month)
else:
    new_date = date.datetime(today.year,today.month+1,last_day_of_month)
date_time_str = new_date.strftime("%Y-%m-%d")
print(date_time_str)

#code to calculate next installment date after payment
db_date= '2021-03-31'
date_time_obj = date.datetime.strptime(db_date, '%Y-%m-%d')
last_day_of_month_2 = calendar.monthrange(date_time_obj.year, date_time_obj.month + 1)[1]
if date_time_obj.month==12:
    new_installment_date = date.datetime(date_time_obj.year+1, 1, last_day_of_month_2)
else:
    new_installment_date = date.datetime(date_time_obj.year, date_time_obj.month + 1, last_day_of_month_2)
print(new_installment_date.strftime("%Y-%m-%d"))



