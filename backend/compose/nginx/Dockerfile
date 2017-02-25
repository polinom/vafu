FROM nginx:latest
ADD ./backend/compose/nginx/nginx.conf /etc/nginx/nginx.conf

ADD ./backend/compose/nginx/start.sh /start.sh
ADD ./backend/compose/nginx/nginx-secure.conf /etc/nginx/nginx-secure.conf
ADD ./backend/compose/nginx/dhparams.pem /etc/ssl/private/dhparams.pem
CMD /start.sh

