const { expect } = require('chai');
const supertest = require('supertest');

const app = require('../app.js');

describe('createUser test', () => {
    it('註冊成功', (done) => {
        supertest(app)
            .post('/users/register')
            .send({
                email: 'test@gmail.com',
                username: 'test',
                password: '1234'
            })
            .end((err, res) => {
                expect(res.statusCode).equal(201)
                done()
            })
    })
    // it('信箱存在', (done) => {
    //     supertest(app)
    //         .post('/users/register')
    //         .send({
    //             email: 'czw@gmail.com',
    //             username: 'czw',
    //             password: '1234'
    //         })
    //         .end((err, res) => {
    //             expect(res.statusCode).equal(409)
    //             done()
    //         })
    // })
})

describe('userLogin test', () => {
    it('登入成功', (done) => {
        supertest(app)
            .post('/users/login')
            .send({
                email: 'test@gmail.com',
                password: '1234'
            })
            .end((err, res) => {
                expect(res.statusCode).equal(200)
                done()
            })
    })
})

describe('getAllUsers test', () => {
    let APItoken
    before(async () => {
        const res = await supertest(app)
            .post('/users/login')
            .send({
                email: 'test@gmail.com',
                password: '1234'
            })
        APItoken = res.body.token
    })
    it('取得所有用戶', (done) => {
        supertest(app)
            .get('/users')
            .set({ Authorization: `Bearer ${APItoken}`})
            .end((err, res) => {
                expect(res.statusCode).equal(200)
                done()
            })
    })
})

describe('getUserById test', () => {
    let APItoken
    before(async () => {
        const res = await supertest(app)
            .post('/users/login')
            .send({
                email: 'test@gmail.com',
                password: '1234'
            })
        APItoken = res.body.token
    })
    it('取得指定用戶', (done) => {
        supertest(app)
            .get('/users/1')
            .set({ Authorization: `Bearer ${APItoken}`})
            .end((err, res) => {
                expect(res.statusCode).equal(200)
                done()
            })
    })
    it('沒有該使用者', (done) => {
        supertest(app)
            .get('/users/2')
            .set({ Authorization: `Bearer ${APItoken}`})
            .end((err, res) => {
                expect(res.statusCode).equal(404)
                done()
            })
    })
})

//need to fix
describe('getCurrentUser test', () => {
    let APItoken
    before(async () => {
        const res = await supertest(app)
            .post('/users/login')
            .send({
                email: 'czw@gmail.com',
                password: '1234'
            })
        APItoken = res.body.token
    })
    it('取得當前用戶', (done) => {
        supertest(app)
            .get('/users/myprofile')
            .set({ Authorization: `Bearer ${APItoken}` })
            .end((err, res) => {
                expect(res.statusCode).equal(200)
                done()
            })
    })
})

//need to fix
describe('getPremiumUser test', () => {
    it('高級用戶', (done) => {
        let APItoken
        before(async () => {
            const res = await supertest(app)
                .post('/users/login')
                .send({
                    email: 'czw@gmail.com',
                    password: '1234'
                })
            APItoken = res.body.token
        })
        supertest(app)
            .get('/users/premiumUser')
            .set({ Authorization: `Bearer ${APItoken}` })
            .end((err, res) => {
                expect(res.statusCode).equal(200)
                done()
            })
    })
    it('非高級用戶', (done) => {
        let APItoken
        before(async () => {
            const res = await supertest(app)
                .post('/users/login')
                .send({
                    email: 'test@gmail.com',
                    password: '1234'
                })
            APItoken = res.body.token
        })
        supertest(app)
            .get('/users/premiumUser')
            .set({ Authorization: `Bearer ${APItoken}` })
            .end((err, res) => {
                expect(res.statusCode).equal(401)
                done()
            })
    })
})

describe('updateUser test', () => {
    let APItoken
    before(async () => {
        const res = await supertest(app)
            .post('/users/login')
            .send({
                email: 'test@gmail.com',
                password: '1234'
            })
        APItoken = res.body.token
    })
    it('更新成功', (done) => {
        supertest(app)
            .put('/users/16')
            .set({ Authorization: `Bearer ${APItoken}` })
            .send({
                email: 'test@gmail.com',
                password: '1234'
            })
            .end((err, res) => {
                expect(res.statusCode).equal(200)
                done()
            })
    })
})

describe('deleteUser test', () => {
    let APItoken
    before(async () => {
        const res = await supertest(app)
            .post('/users/login')
            .send({
                email: 'test@gmail.com',
                password: '1234'
            })
        APItoken = res.body.token
    })
    it('刪除成功', (done) => {
        supertest(app)
            .delete('/users/16')
            .set({ Authorization: `Bearer ${APItoken}` })
            .end((err, res) => {
                expect(res.statusCode).equal(200)
                done()
            })
    })
})
