### Example Config
The config goes in /src/config.json
```json
{
    "webhooks": ["discord webhooks"],
    "conf": {
        "pollFrequency": 300000,
        "trello": {
            "boards": ["board id"],
            "key": "trello key", 
            "token": "trello token"
        }
    }
}
```

> I also provided a Dockerfile and a docker-compose for those of you(like me) who only run stuff in docker
