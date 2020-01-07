/**
 * 统计控制器
 * @author Philip
 */
const releaseRecordDao = require('../dao/release-record')

/**
 * 提交分类统计
 * @Controller
 */
module.exports.releases = async (req, res) => {
    let params = req.query || {}
    let { pageIndex, pageSize } = params
    let filters = {}

    Object.keys(params).forEach((key) => {
        const val = params[key]
        
        if (key !== 'pageIndex' && key !== 'pageSize') {
            filters[key] = val
        }
    })

    let { code, message, data } = await releaseRecordDao.query(filters, pageIndex, pageSize)

    if (code === 200) {
        res.json(data)
    } else {
        res.send(code, { message })
    }
}
