FROM node:current

WORKDIR /app

COPY ./app/* /app/

VOLUME [ "/app" ]

ENTRYPOINT ["tail"]
CMD ["-f","/dev/null"]