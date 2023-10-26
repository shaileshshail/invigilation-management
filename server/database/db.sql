
CREATE TABLE classrooms(
    roomId VARCHAR(6),
    capacity INT,
    PRIMARY KEY(roomId)
);

CREATE TABLE staffs(
    staffId VARCHAR(10),
    role VARCHAR(10) NOT NULL,
    name VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(200) NOT NULL,
    phone INT,
    dept VARCHAR(50),
    PRIMARY KEY(staffId)
);

CREATE TABLE events(
    eventId int AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    session CHAR(2),
    startTime TIME,
    endTime TIME,
    PRIMARY KEY(eventId)
);

CREATE TABLE eventDetails(
    eventId INT,
    staffId VARCHAR(10),
    classroomId VARCHAR(50),
    date DATE NOT NULL,
    session CHAR(2) NOT NULL,
    attended BOOLEAN NOT NULL DEFAULT 0,
    PRIMARY KEY(eventId,staffId,classroomId),
    FOREIGN KEY (eventId) REFERENCES events(eventId),
);

CREATE TABLE currentUsers(
	email VARCHAR(50),
	refreshToken varchar(600) UNIQUE
);