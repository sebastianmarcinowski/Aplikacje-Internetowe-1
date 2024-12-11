create table competitor
(
    id      integer not null
        constraint competitor_pk
            primary key autoincrement,
    name    text    not null,
    surname text    not null,
    weight  integer not null,
    wins   integer not null,
    losses  integer not null
);