FROM ubuntu:latest

RUN apt update && apt install openssh-server sudo rsyslog -y

RUN useradd -rm -d /home/test -s /bin/bash -g root -G sudo -u 1000 test 

RUN mkdir /home/test/.ssh && chmod 700 /home/test/.ssh && chown test /home/test/.ssh

COPY test.pub /home/test/.ssh/authorized_keys

RUN chmod 600 /home/test/.ssh/authorized_keys && chown test /home/test/.ssh/authorized_keys

RUN  echo 'test:test' | chpasswd

RUN echo "test ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

EXPOSE 22

CMD rsyslogd && service ssh start && tail -F /var/log/auth.log
