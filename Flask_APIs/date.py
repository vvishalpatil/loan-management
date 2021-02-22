from datetime import timedelta, datetime
import calendar
import datetime as date

# To calculate installment date for the first time when user applies for the loan

#code to calculate next installment date after payment
db_date= '2021-03-31'
date_time_obj = date.datetime.strptime(db_date, '%Y-%m-%d')
last_day_of_month_2 = calendar.monthrange(date_time_obj.year, date_time_obj.month + 1)[1]
if date_time_obj.month==12:
    new_installment_date = date.datetime(date_time_obj.year+1, 1, last_day_of_month_2)
else:
    new_installment_date = date.datetime(date_time_obj.year, date_time_obj.month + 1, last_day_of_month_2)
print(new_installment_date.strftime("%Y-%m-%d"))



