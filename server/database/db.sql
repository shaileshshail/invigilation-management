
CREATE TABLE classrooms(
    roomId VARCHAR(6),
    capacity INT,
    PRIMARY KEY(roomId)
);

CREATE TABLE staff(
    staffId VARCHAR(10),
    role VARCHAR(10) NOT NULL,
    name VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL,
    phone INT,
    dept VARCHAR(50),
    dutiesCompleted INT,
    PRIMARY KEY(staffId)
);

CREATE TABLE event(
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
    attended BOOLEAN NOT NULL DEFAULT 0,
    PRIMARY KEY(eventId,staffId,classroomId),
    FOREIGN KEY (eventId) REFERENCES event(eventId),
    FOREIGN KEY (staffId) REFERENCES staff(staffId),
    FOREIGN KEY (classroomId) REFERENCES classrooms(roomId)
);