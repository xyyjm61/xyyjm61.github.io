# 余剑锰个人主页

一个基于 [brayandiazc/portfolio-template-basic](https://github.com/brayandiazc/portfolio-template-basic)（MIT License）制作的中文静态个人主页。

## 页面内容

- 个人简介与求职方向
- 专业技能
- 项目经验
- 工作经历
- 教育背景
- 联系方式
- 公开版简历下载

## 本地预览

```bash
python -m http.server 8000
```

然后访问 <http://localhost:8000>。

## 部署

1. 将代码推送到公开仓库 `xyyjm61.github.io`。
2. 在 GitHub 仓库 Settings → Pages 中设置自定义域名为 `home.xyyjm61.top`。
3. 在 Cloudflare 新增 CNAME 记录 `home` → `xyyjm61.github.io`，代理状态选择 DNS only（灰色云朵）。
4. 等待 DNS 和证书生效，访问 <https://home.xyyjm61.top>。

## 维护

- 修改项目经验：`assets/js/projects.js`
- 修改页面文案：`index.html`
- 修改样式：`assets/css/styles.css`
- 修改公开简历：重新生成 `assets/resume-public.pdf`

公开版简历不包含手机号。原始完整简历和任何密钥不要提交到仓库。
