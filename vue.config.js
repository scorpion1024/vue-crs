module.exports = {
    lintOnSave: true,
    devServer: {
        port: 8081,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1',
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    }
}