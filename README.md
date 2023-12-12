
前端说明：
<p align="center">
  <b>左侧职工列表已配置完成，单机前端时已验证过可用性，配置代码如下</b>
</p>
<table align="center" cellspacing="0" cellpadding="0">
  <tbody>
    <tr>
      <td align="center" valign="middle">
        <a href="https://imgse.com/i/pifeFOS"><img src="https://z1.ax1x.com/2023/12/12/pifeFOS.png" alt="pifeFOS.png" border="0" /></a>
      </td>
    </tr>
  </tbody>
</table>
由于elementui拉下来的代码配置了token拦截页面，token为前端生成且封装深较多，未花费时间定位修改token获取方式，故登陆时未执行token设置方式，但定位到token设置方法，添加白名单绕过拦截，导致为纯页面显示，定位token设置代码如下：

<a href="https://imgse.com/i/pifeYk9"><img src="https://z1.ax1x.com/2023/12/12/pifeYk9.png" alt="pifeYk9.png" border="0" /></a>

