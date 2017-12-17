#rest API(发送请求的规定)
## 非rest风格
  * http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=161028192308012
  * 请求的url中有请求行为的表现
  * 请求方式不能决定请求的行为
  * 没有实现专人专职
## rest API(rest风格)
  * 前后端交互越来越多，应该去定义个统一的接口机制
  * 专人专职的目的
  * GET, POST, PUT, DELETE
  * 请求的方式决定请求的行为
  * 适用标准的方法去操作数据
  * 每一个数据都应该有一个唯一的标识
  * 表述性状态转移： 在客户端不断通过不同的方式去修改数据的状态。