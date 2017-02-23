FROM nginx:latest
ADD ./backend/compose/nginx/nginx.conf /etc/nginx/nginx.conf

COPY ./frontend/build /frontend/build
COPY ./frontend/build /staticfiles
COPY ./backend/backend/static /staticfiles

ADD ./backend/compose/nginx/start.sh /start.sh
ADD ./backend/compose/nginx/nginx-secure.conf /etc/nginx/nginx-secure.conf
ADD ./backend/compose/nginx/dhparams.pem /etc/ssl/private/dhparams.pem
CMD /start.sh

