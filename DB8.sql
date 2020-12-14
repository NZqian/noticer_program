use s2018300410;

drop table if exists user;
create table user(
    uno char(15),
    uacademy char(10),
    utype char(10),
    uname char(10),
    password char(30),
    primary key(uno)
);

drop table if exists groupinfo;
create table groupInfo(
    gno char(15),
    gname char(15),
    gtype char(10),
    primary key(gno)
);

drop table if exists todo;
create table todo(
    tno int auto_increment,
    uno char(15),
    tcontent char(100),
    foreign key(uno) references user(uno),
    primary key(tno)
);

drop table if exists noticeinfo;
CREATE TABLE noticeinfo (
  `nno` INT NOT NULL AUTO_INCREMENT,
  `ntitle` CHAR(20) NULL,
  `ncontent` CHAR(100) NULL,
  `ntime` DATETIME NULL,
  `gno` CHAR(15) NULL,
  PRIMARY KEY (`nno`),
  INDEX `groupno_idx` (`gno` ASC) VISIBLE,
  CONSTRAINT `groupno`
    FOREIGN KEY (`gno`)
    REFERENCES groupinfo (`gno`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

drop table if exists noticeuser;
CREATE TABLE noticeuser (
  `nno` INT NOT NULL,
  `uno` CHAR(15) NOT NULL,
  `received` TINYINT NULL,
  PRIMARY KEY (`nno`, `uno`),
  INDEX `userno_idx` (`uno` ASC) VISIBLE,
  CONSTRAINT `userno`
    FOREIGN KEY (`uno`)
    REFERENCES user (`uno`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `noticeno`
    FOREIGN KEY (`nno`)
    REFERENCES noticeinfo (`nno`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

drop table if exists groupuser;
create table groupUser(
    gno char(15),
    uno char(15),
    foreign key(gno) references groupInfo(gno),
    foreign key(uno) references user(uno)
);

drop table if exists usertodo;
create table userTodo(
    uno char(15),
    tno int,
    foreign key(uno) references user(uno),
    foreign key(tno) references todo(tno)
);


use s2018300410;
drop procedure if exists insert_noticeuser;
delimiter $$
create procedure insert_noticeuser(in a_nno int, in a_gno char(15))
begin
	declare finished int default 0;
	declare tmp_uno char(20) default '';
    declare tmp_utype char(10) default '';
    declare tmp_sname varchar(20) default '';
    declare out_sname varchar(100) default '';
    declare groupuser_cursor cursor for 
		select uno from groupuser where gno=a_gno;
    declare continue handler for not found set finished = 1;
	
    open groupuser_cursor;
	repeat
		fetch groupuser_cursor into tmp_uno;
        #select tmp_sno;
        if not finished then
			select utype into tmp_utype from user where uno=tmp_uno;
            if tmp_utype = 'student' then
				insert into noticeuser values(a_nno, tmp_uno, 0);
            end if;
		end if;
	until finished
    end repeat;
    close groupuser_cursor;
end $$

delimiter ;

drop trigger if exists add_user_into_noticeuser;
delimiter $$
create trigger add_user_into_noticeuser after insert on noticeinfo for each row
begin
    call insert_noticeuser(new.nno, new.gno);
end $$
delimiter ;