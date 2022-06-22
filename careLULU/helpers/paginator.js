
const paginator = ({ count, rows, limit, from }) => {
    const pages = Math.ceil(count / (limit || 10))
    const hasNext = (from + 1) * (limit || 10) < count
    const currPage = Math.ceil(from / pages) + 1
    return {
        data: rows,
        pageInfo: {
            count: count,
            pages: pages,
            hasNext: hasNext,
            currPage: currPage,
        }
    }
}

module.exports = {
    paginator
}
