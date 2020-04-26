
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'my_umi_demo',
      dll: false,
      
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  publicPath: './', //指定 webpack 的 publicPath，指向静态资源文件所在的路径
  disableCSSModules: true, //禁用 CSS Modules
  base:'/', //指定 react-router 的 base，部署到非根目录时需要配置
  outputPath: './build' //指定输出路径
}
