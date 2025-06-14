# 빌드 스테이지
FROM eclipse-temurin:11-jdk-alpine AS builder

# 빌드용 디렉토리
WORKDIR /build

# Gradle wrapper와 설정 파일들 복사
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .

# 실행 권한 부여
RUN chmod +x ./gradlew

# 의존성 캐싱을 위한 더미 빌드
RUN ./gradlew dependencies --no-daemon || true

# 소스코드 복사
COPY src src

# 애플리케이션 빌드
RUN ./gradlew bootJar --no-daemon

# 런타임 스테이지
FROM eclipse-temurin:11-jre-alpine

# 애플리케이션 실행용 디렉토리
WORKDIR /app

# 빌드된 JAR 파일만 복사
COPY --from=builder /build/build/libs/*.jar app.jar

# 포트 노출
EXPOSE 8889

# 실행 명령
ENTRYPOINT ["java", "-jar", "app.jar"]