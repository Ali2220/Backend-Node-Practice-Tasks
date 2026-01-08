// ye Humara global try / catch hai. Ab humein har route mai try / catch nhi likhna pre ga.
// fn -> humara route handler
const asyncHandler = (fn)  => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next)
    }
}

module.exports = asyncHandler