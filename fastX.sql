create database fastX
Use FastX

CREATE TABLE [User] (
    UserID INT PRIMARY KEY IDENTITY,
    Name NVARCHAR(100) NOT NULL,
    Gender NVARCHAR(10),
    ContactNumber NVARCHAR(20),
    Address NVARCHAR(255),
    Email NVARCHAR(100) UNIQUE,
    Password NVARCHAR(255) NOT NULL,
	Role NVARCHAR(30) NOT NULL
);

CREATE TABLE BusOperator (
    BusOperatorID INT PRIMARY KEY IDENTITY,
    Name NVARCHAR(100) NOT NULL,
    Gender NVARCHAR(10),
    ContactNumber NVARCHAR(20),
    Address NVARCHAR(255),
    Email NVARCHAR(100) UNIQUE,
    Password NVARCHAR(255) NOT NULL,
	Role NVARCHAR(30) NOT NULL
);
CREATE TABLE Administrator (
    AdminID INT PRIMARY KEY IDENTITY,
    Email NVARCHAR(100) UNIQUE NOT NULL,
    Password NVARCHAR(255) NOT NULL,
	Role NVARCHAR(30) NOT NULL
);
CREATE TABLE BusRoutes (
    RouteID INT IDENTITY(1,1) PRIMARY KEY,
    Origin NVARCHAR(100) NOT NULL,
    Destination NVARCHAR(100) NOT NULL,
    TravelDate DATE NOT NULL
);
CREATE TABLE Buses (
    BusID INT PRIMARY KEY IDENTITY,
    RouteID INT,
    OperatorID INT,
    BusName NVARCHAR(100),
    BusNumber NVARCHAR(20),
    SeatType NVARCHAR(20),
    BusType NVARCHAR(30),
    NumberOfSeats INT,
    PickUp NVARCHAR(100),
    DropPoint NVARCHAR(100),
    WaterBottle BIT,
    ChargingPoint BIT,
    TV BIT,
    Blanket BIT,
    FOREIGN KEY (RouteID) REFERENCES BusRoutes(RouteID) ON DELETE CASCADE On update cascade,
    FOREIGN KEY (OperatorID) REFERENCES BusOperator(BusOperatorID) ON DELETE CASCADE on update cascade 
);

CREATE TABLE BusSchedule (
    ScheduleID INT IDENTITY(1,1) PRIMARY KEY,
    BusID INT FOREIGN KEY REFERENCES Buses(BusID)  ON DELETE CASCADE ON UPDATE CASCADE,
    DepartureTime TIME NOT NULL,
    ArrivalTime TIME NOT NULL,
    Fare DECIMAL(10, 2) NOT NULL
);

CREATE TABLE Seats (
    SeatID INT IDENTITY(1,1) PRIMARY KEY,
    BusID INT FOREIGN KEY REFERENCES Buses(BusID)  ON DELETE CASCADE ON UPDATE CASCADE,
    SeatNumber INT NOT NULL,
    IsAvailable BIT NOT NULL
);



CREATE TABLE Booking (
    BookingID INT IDENTITY(1,1) PRIMARY KEY,
    BusID INT FOREIGN KEY REFERENCES Buses(BusID) ON DELETE CASCADE ON UPDATE CASCADE,
    ScheduleId INT FOREIGN KEY REFERENCES BusSchedule(ScheduleID) ON DELETE NO ACTION ,
    UserID INT FOREIGN KEY REFERENCES [User](UserID) ON DELETE NO ACTION ,
    TotalSeats INT NOT NULL,
    SeatNumbers NVARCHAR(MAX) NOT NULL,
    TotalCost DECIMAL(10, 2) NOT NULL,
    BookingDate DATETIME DEFAULT GETDATE() NOT NULL
);


CREATE TABLE Payment (
    PaymentID INT IDENTITY(1,1) PRIMARY KEY,
    BookingID INT FOREIGN KEY REFERENCES Booking(BookingID) ON DELETE CASCADE ON UPDATE CASCADE,
    PaymentAmount DECIMAL(10, 2) NOT NULL,
    PaymentDate DATETIME DEFAULT GETDATE() NOT NULL,
    PaymentMethod NVARCHAR(50) NOT NULL,
    TransactionStatus NVARCHAR(100) NOT NULL
);


CREATE TABLE LoginTable (
    LoginId INT PRIMARY KEY IDENTITY,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    Password NVARCHAR(50) NOT NULL,
    Role NVARCHAR(30) NOT NULL,
    BusOperatorID INT,
    UserID INT,
    AdminID INT,
    FOREIGN KEY (BusOperatorID) REFERENCES BusOperator(BusOperatorID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (UserID) REFERENCES [User](UserID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (AdminID) REFERENCES Administrator(AdminID) ON DELETE CASCADE ON UPDATE CASCADE
);



CREATE TRIGGER trg_User_Insert
ON [User]
AFTER INSERT
AS
BEGIN
    INSERT INTO LoginTable(Email, Password, Role,UserID)
    SELECT Email, Password, Role,UserID
    FROM inserted;
END;

CREATE TRIGGER trg_Operator_Insert
ON BusOperator
AFTER INSERT
AS
BEGIN
    INSERT INTO LoginTable (Email, Password, Role,BusOperatorID)
    SELECT Email, Password, Role,BusOperatorID
    FROM inserted;
END;



CREATE TRIGGER trg_Admin_Insert
ON Administrator
AFTER INSERT
AS
BEGIN
    INSERT INTO LoginTable (Email, Password, Role,AdminID)
    SELECT Email, Password, Role,AdminID
    FROM inserted;
END;





INSERT INTO BusRoutes (Origin, Destination, TravelDate)
VALUES ('Delhi', 'Bhopal', '2023-03-15'),
       ('Delhi', 'Nagpur', '2023-03-16');

INSERT INTO Administrator  (Email, Password,Role)
VALUES ('prakash@gmail.com', 'prakash12','Admin')


INSERT INTO BusOperator (Name,Gender,ContactNumber,Address,Email,Password,Role)
VALUES('Shyam Joshi','Male','22334455','Andheri,Mumbai','shyam@gmail.com','shyam11','Operator'),
('Devi Prasad','Male','33445112','Ghatkopar,Mumbai','devi@gmail.com','devi11','Operator'),
('Diya Bharti','Female','78759495','Dwarka,Delhi','diya@gmail.com','diya11','Operator'),
('Aditi Mehta','Female','22399955','Karol Bagh,Delhi','aditi@gmail.com','aditi11','Operator')

Select * from Administrator
Select * from BusOperator
select*from Busroutes
select*from [user]






INSERT INTO BusSchedule(BusID,DepartureTime,ArrivalTime,Fare)
VALUES(1008,'3:00 AM','10:00 AM',1200),
(1009,'12:00 PM','8:00 PM',750),
(3,'09:00 PM','8:00 AM',1800),
(4,'12:00 PM','8:00 PM',750),
(2,'04:00 PM','12:00 AM',1400),
(4,'12:00 PM','8:00 PM',750),
(3,'12:00 PM','8:00 PM',750)

INSERT INTO Seats(BusId,SeatNumber,IsAvailable)
VALUES(1008,1,1),(1009,2,1),(10,3,1),(1,4,1),(1,5,1),(1,6,1),(1,7,1),(1,8,1),(1,9,1),(1,10,1),(1,11,1),(1,12,1),(1,13,1),(1,14,1),(1,15,1),(1,16,1),(1,17,1),(1,18,1),(1,19,1),(1,20,1)


INSERT INTO Seats(BusId,SeatNumber,IsAvailable)
VALUES(17,1,1),(17,2,0),(17,3,0),(17,4,1),(17,5,0),(17,6,1),(17,7,0),(17,8,0),(17,9,1),(17,10,1),
(17,11,1),(17,12,1),(17,13,1),(17,14,1),(17,15,1),(17,16,1),(17,17,1),(17,18,1),(17,19,1),(17,20,1)

INSERT INTO Seats(BusId,SeatNumber,IsAvailable)
VALUES(3,1,1),(3,2,1),(3,3,1),(3,4,1),(3,5,1),(3,6,1),(3,7,1),(3,8,1),(3,9,1),(3,10,1),(3,11,1),(3,12,1),(3,13,1),(3,14,1),(3,15,1),(3,16,1),(3,17,1),(3,18,1),(3,19,1),(3,20,1)

INSERT INTO Buses(RouteID,OperatorID,BusName,BusNumber,SeatType,BusType,NumberOfSeats,PickUp,DropPoint,WaterBottle,ChargingPoint,TV,Blanket)
VALUES
(26,5,'Parveen Travels','MA-01-76PP','Sleeper','AC',20,'Delhi','Kochi',1,1,1,1),
(19,10,'Deva Travels','DL-01-24R5','Chair','Non-Ac',30,'Mumbai','Kochi',0,1,0,1),
(20,11,'Kumaran Travels','DL-02-32Y5','Chair','AC',20,'Chennai','Bhopal',0,0,1,1),
(21,6,'Jeevan Travels','DL-01-21R5','Sleeper','Non-AC',20,'Chennai','Nagpur',1,1,1,0)



select*from BusOperator
select*from Administrator

select*from BusSchedule
select*from buses
select*from BusRoutes

INSERT INTO BusSchedule(BusID,DepartureTime,ArrivalTime,Fare)
VALUES(4,'11:00 PM','06:00 AM',1000)

select*from Booking
select*from Payment
select*from [User]
select*from Seats

select*from LoginTable

select*from LoginTable

select*from buses


update buses set PickUp='Delhi' where BusID=4














