/**
 * 路由配置
 * @author Philip
 */

const recordController = require("./controller/record")
const projectController = require("./controller/project")
const githookController = require("./controller/githook")
const authorizeController = require("./controller/authorize")
const statisticsController = require("./controller/statistics")
const csrf = require('csurf')

// csrf
const csrfProtection = csrf({ cookie: true })

module.exports = (app) => {
    // 天空页
    app.get("/", (req, res) => {
        res.render("index.html")
    })

    // 登陆页
    app.get("/login", (req, res) => {
        res.render("login.html")
    })

    // 图表
    app.get("/charts", csrfProtection, (req, res) => {
        res.render("admin/charts.html", {
        csrfToken: req.csrfToken(),
            name: 'charts'
        })
    })

    // 项目
    app.get("/projects", csrfProtection, (req, res) => {
        res.render("admin/projects.html", { 
            csrfToken: req.csrfToken(),
            name: 'projects'
        })
    })

    // 记录
    app.get("/records", csrfProtection, (req, res) => {
        res.render("admin/records.html", { 
            csrfToken: req.csrfToken(),
            name: 'records'
        })
    })

    // 查询发布记录
    app.post("/api/login", (req, res) => {
        authorizeController.login(req, res)
    })

    // 查询发布记录
    app.get("/logout", (req, res) => {
        authorizeController.logout(req, res)
    })

    // 查询发布记录
    app.get("/api/records", (req, res) => {
        recordController.query(req, res)
    })

    // 删除发布记录
    app.delete("/api/record/:id", csrfProtection, (req, res) => {
        recordController.delete(req, res)
    })

    // 查询项目
    app.get("/api/projects", (req, res) => {
        projectController.query(req, res)
    })

    // 更新项目ID
    app.put("/api/project/:id", csrfProtection, (req, res) => {
        projectController.update(req, res)
    })

    // 创建项目
    app.post("/api/project", csrfProtection, (req, res) => {
        projectController.create(req, res)
    })

    // 删除项目
    app.delete("/api/project/:id", csrfProtection, (req, res) => {
        projectController.delete(req, res)
    })

    // 修改密码
    app.post("/api/modify-password", (req, res) => {
        authorizeController.modifypassword(req, res)
    })

    // 分类统计接口
    app.get("/api/statistics/categories", (req, res) => {
        statisticsController.categories(req, res)
    })

    // 提交统计接口
    app.get("/api/statistics/commits", (req, res) => {
        statisticsController.commits(req, res)
    })

    // github hook 接口
    app.post("/api/git/release", (req, res) => {
        githookController.release(req, res)
    })
}
