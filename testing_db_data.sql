DELETE FROM user_accounts, personal_debts, group_debt, rent, chores, groceries;

INSERT INTO user_accounts (first_name, last_name,
email, password, phone_number, group_id)
VALUES 
('Kyle', 'McDevitt', 'kyle@gmail.com', 'password', 1234567890,1),
('John', 'Doe', 'jd@gmail.com', 'password', 9876543210, 1),
('Nancy', 'Smith', 'nsmith@gmail.com', 'password', 2168952473, 1),
('John', 'Smith', 'jssmith@yahoo.com', 'password', 6194732456, 1);
('Lame', 'Loser', 'lameloser@gmail.com', 'password', 3333333333, NULL); -- A user that's not in any group, but still exists and can login. Has no other authorizations.

INSERT INTO personal_debts (amount, lender_id, borrower_id)
VALUES
(500.52, 1, 2),
(400.32, 2, 3),
(300.69, 4, 2);

INSERT INTO groups (group_name)
VALUES
('Shared Spaces');

INSERT INTO group_debt(debt_type, amount, group_id)
VALUES
('Food', 5000.42, 1),
('Beer', 19.18, 1),
('Hole in the wall', 200, 1),
('Food', 20, 1);

INSERT INTO rent (rent_amount, rent_paid, user_id, group_id)
VALUES 
(400.52, false, 2, 1),
(400.52, true, 1, 1),
(400.52, false, 3, 1),
(400.52, true, 4, 1);

INSERT INTO chores (chore, due_date, chore_complete, user_id, group_id)
VALUES
('Take out the trash', '2017-11-06', false, 1, 1),
('Dishes', '2017-11-07', true, 2, 1),
('Bathroom sink', '2016-09-20', false, 3, 1),
('Dishes', '2017-10-10', false, 2, 1);

INSERT INTO groceries (amount_due, paid_status, user_id, group_id)
VALUES
(50.68, false, 2, 1),
(42.00, false, 1, 1),
(68.00, true, 3, 1),
(70.00, false, 4, 1),
(80.00, true, 2, 1); 