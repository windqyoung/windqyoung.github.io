---
title: Java Mail 发送demo
---

```java
public class JavaMainDemo
{
    public static void main(String[] args) throws Exception {

        //初始化默认参数
        Properties props = new Properties();
        props.setProperty("mail.transport.protocol", "smtp");
        props.setProperty("mail.host", MAIL_HOST);
        props.setProperty("mail.user", MAIL_USER);
        props.setProperty("mail.from", MAIL_FROM);
        //获取Session对象
        Session session = Session.getInstance(props, null);
        //开启后有调试信息
        session.setDebug(true);

        //通过MimeMessage来创建Message接口的子类
        MimeMessage message = new MimeMessage(session);
        // 发件人
        InternetAddress from = new InternetAddress(MAIL_FROM, "测试发件人");
        message.setFrom(from);

        //设置收件人：
        InternetAddress to = new InternetAddress(MAIL_TO);
        message.setRecipient(Message.RecipientType.TO, to);

        message.setRecipient(Message.RecipientType.CC, from);

        //设置邮件主题
        message.setSubject("test for 主题");

        /*
         * 邮件结构为
         * mixed
         *      alternative
         *          related
         *              text/html
         *              inline
         *          text/plain
         *
         *      attachment
         */
        var mixed = new MimeMultipart();
        message.setContent(mixed);

        // 附件1
        var attach1 = new MimeBodyPart();
        mixed.addBodyPart(attach1);
        attach1.attachFile(new File("mimefile.txt"));
        attach1.setFileName("文件1.txt");

        // 附件2
        var attach2 = new MimeBodyPart();
        mixed.addBodyPart(attach2);
        attach2.setDisposition(MimeBodyPart.ATTACHMENT);
        attach2.setFileName("文件2.txt");
        attach2.setDataHandler(new DataHandler("文件2内容", "text/plain;charset=utf-8"));

        // 主内容
        var content_body = new MimeBodyPart();
        mixed.addBodyPart(content_body);

        // 二选一内容
        var alternative_multi = new MimeMultipart("alternative");
        content_body.setContent(alternative_multi);

        // html+内联
        var related_body = new MimeBodyPart();
        alternative_multi.addBodyPart(related_body);

        var related_multi = new MimeMultipart("related");
        related_body.setContent(related_multi);

        var html = new MimeBodyPart();
        related_multi.addBodyPart(html);
        // img1为下面的内联图片
        html.setContent("hello <img src='cid:img1'>", "text/html");

        var img = new MimeBodyPart();
        related_multi.addBodyPart(img);
        img.setDataHandler(new DataHandler(new FileDataSource("1.jpg")));
        img.setContentID("<img1>");

        // text 内容
        var text_body = new MimeBodyPart();
        alternative_multi.addBodyPart(text_body);
        text_body.setText("文件显示内容", "utf-8", "plain");

        //获取Transport对象
        Transport transport = session.getTransport();
        //smtp验证，就是你用来发邮件的邮箱用户名密码（若在之前的properties中指定默认值，这里可以不用再次设置）
        transport.connect();
        //发送邮件
        transport.sendMessage(message, message.getAllRecipients()); // 发送
    }
}
```