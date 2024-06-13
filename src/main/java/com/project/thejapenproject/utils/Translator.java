package com.project.thejapenproject.utils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class Translator {
    @Value("${translator.key}")
    private String key;
    @Value("${translator.endpoint}")
    public String endpoint;
    @Value("${translator.location}")
    public String location;
    public String url;

    OkHttpClient client = new OkHttpClient();

    /**
     * 언어 :
     *  일본어 : ja, 영어 : en, 한국어 : ko, 이탈리아어 : it
     * **/
    public String Post(String word, String from, String to) throws IOException {

        String route = "/translate?api-version=3.0&from=" + from + "&to=" + to;
        url = endpoint.concat(route);
        MediaType mediaType = MediaType.parse("application/json");
        RequestBody body = RequestBody.create(mediaType,
                "[{\"Text\": \"" + word +"\"}]");
        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .addHeader("Ocp-Apim-Subscription-Key", key)
                .addHeader("Ocp-Apim-Subscription-Region", location)
                .addHeader("Content-type", "application/json")
                .build();
        Response response = client.newCall(request).execute();
        return response.body().string();
    }
    public String prettify(String json_text) {
        JsonParser parser = new JsonParser();
        JsonElement json = parser.parse(json_text);
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        return gson.toJson(json);
    }
}
