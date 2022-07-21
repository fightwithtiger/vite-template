# 1. 页面缓存
这里的keep-alive使用有个问题，
场景：两个页面A，B
A中跳转到B，B返回A，希望A能够保持之前的状态

bug：
给A页面meta.keepAlive属性设置为true，B页面不设置，
则按照上述过程走完后A仍然不能保存状态，需要同时对A，B都设置meta.keepAlive=true
才能达到预期

分析
代码中是同过v-if来判断是否使用keep-alive组件，如果A设置了keepAlive，
而B不设置，相当于A跳B的过程是要先销毁keep-alive组件的，然后创建一个不被keep-alive组件包裹的component
原因就很清楚了：因为B没有设置，导致原有的keep-alive组件被销毁，
即使B返回A，也只是重新创建一个新的keep-alive组件，所以就谈不上保存A的状态了

解决方法
1. 给A，B同时设置上meta.keepAlive=true，这样在A，B页面切换，这个keep-alive组件是没有被销毁的，数据自然就保存下来了
2. 在A页面里嵌套一个router-view，把B页面配置成A的子路由，相当与A跳转到B，就是打开了B这个组件，A页面是没有
被销毁的，状态自然也保存下来了，同时又可以用router上的方法进行跳转，弥补了单纯用组件不能使用
router方法的不足