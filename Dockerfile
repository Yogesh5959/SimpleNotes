RUN mvn clean package -Dmaven.test.skip=true

WORKDIR /app

COPY backend/demo.SimpleNotes/pom.xml .
COPY backend/demo.SimpleNotes/src ./src

RUN mvn clean package -DskipTests

FROM eclipse-temurin:24-jre

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
