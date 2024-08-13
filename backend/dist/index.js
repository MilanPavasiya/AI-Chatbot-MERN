import express from 'express';
const app = express();
app.post('/hello', (req, res, next) => {
    console.log(req.body.name);
    return res.send('hello');
});
app.listen(5000, () => console.log('Server Open'));
//# sourceMappingURL=index.js.map