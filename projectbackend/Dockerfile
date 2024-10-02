# Base image olarak OpenJDK kullanılıyor
FROM openjdk:17-jdk-alpine

# Uygulamanın içinde çalışacağı dizini oluştur
VOLUME /tmp

# Jar dosyasını belirle
ARG JAR_FILE=target/*.jar

# Jar dosyasını container içine kopyala
COPY ${JAR_FILE} app.jar

# Uygulamayı başlat
ENTRYPOINT ["java", "-jar", "/app.jar"]

