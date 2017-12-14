# Run this script if the server starts showing errors about invalid authentication modes.
# It tends to do this after crashing.
# You may also need to input these commands manually rather than just doing `source fix_privileges.sql` but I'm not really sure.
use mysql;
update user set authentication_string=password(''), plugin='mysql_native_password' where user='root';
flush privileges;