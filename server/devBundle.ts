import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpackConfig from "../webpack.client";
import {Express} from "express";

export default (app: Express) => {
  const compiler = webpack(webpackConfig as any);
  const middleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
}