const WebSocket = require('ws');

const ws = new WebSocket('ws://ab73b4b8640284470834463903f3667f-1857913852.us-east-1.elb.amazonaws.com/terminal?pod=guestbook-ui-696ff46b84-cbtzb&container=guestbook-ui&appName=guestbook&appNamespace=argocd&projectName=default&namespace=guestbook',
    {
        headers: {
            'Cookie': 'argocd.token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcmdvY2QiLCJzdWIiOiJhZG1pbjpsb2dpbiIsImV4cCI6MTcyMTMxNjEyMCwibmJmIjoxNzIxMjI5NzIwLCJpYXQiOjE3MjEyMjk3MjAsImp0aSI6IjE3OGIxZGI1LTU0MWMtNGYyNy1hOWUxLWZmN2Y2ZDhiYjg2OSJ9.dbyY2wt1z8N9je0WnRHDf9GAwrP9hOaNHFOH2oqI4Xk',
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
        await delay(10)
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
