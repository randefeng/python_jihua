# _*_ coding:utf-8 _*_
# def1
import requests
import re 
import time 
import os
import json 
# import  jihua_2008cai
import cookie_yang
import shenjihua
# import jihuaapk
# 登陆headers_bets
headers={
    'User-Agent':"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11"
}
headers_bets =headers
filename='cookes.txt'
requests_cookie=''
YICITOU =1
#  ======================================================================
def login(flag):
    urls ='http://main.by189.cn/do_login'
    params={
        'username': '!guest!',
        'password': '!guest!'
    }
    global requests_cookie
    try:
        requests_cookie =requests.Session()
        html = requests_cookie.post(urls,data=params,headers=headers)
        JSON_data_History= json.loads(html.text)  
        if JSON_data_History['status']==1:
            cookie_yang.save_cookies_lwp(requests_cookie.cookies, filename)
            # placeOrder()
            if flag ==1:
                placeOrder()
            print(JSON_data_History['msg'])
        else:
            print(JSON_data_History['msg'])
    except Exception as e:
        print('login----',e)
        placeOrder()
#  ======================================================================
# 获取当前下注的期
def now_oder_qihao():
    url ='http://by189.cn/Mobile/Ajax/mobileAllData?lottery_code=all'
    res = requests_cookie.get(url,headers=headers)
    # print(res.json()['lottery']['cqssc']['next_phase'])
    qihao_now = res.json()['lottery']['bjpk10']['next_phase']
    return qihao_now
# 获取当前下注的期
#  ======================================================================
def getsSelfData():
    url ='http://by189.cn/Mobile/Ajax/mobileAllData?lottery_code=all'
    res = requests_cookie.get(url,headers=headers)
    # print(res.json()['lottery']['cqssc']['next_phase'])
    # qihao_now = res.json()['lottery']['cqssc']['next_phase']
    # print(res.json())
    aa = res.json() 
    bb =aa["lottery"]["bjpk10"]["open_result"]
    # bb=['10', '04', '08', '01', '06', '02', '05', '09', '03', '07']
    # cc = []
    # for  item in bb:
    #     cc.append(int(item))
    # aa["lottery"]["bjpk10"]["open_result"] = cc
    return res.json()   
#  ======================================================================      
def writeFile(d):
    # d ={'differtime': 254, 'next_phase': '20180413058', 'open_phase': '20180413057', 'open_result': ['8', '0', '7', '5', '7'], 'myBuyMoney': 0, 'historyLottery': ['0', '1', '3', '6', '9']}
    f = open('historyMoney.txt','a',encoding='UTF-8')
    time_ ='当前时间'+ time.strftime('%Y-%m-%d %H:%M:%S')+'\n'
    nowQI ='第'+str(d['open_phase'])+'期'+'\n'
    buyHao = '下注记录:'+str(d['historyLottery'])+'\n'
    money_ ='单注money_:'+str(pow(2, d['myBuyMoney']))+'\n'
    result ='上期结果:'+str(d['open_result'])+'\n'
    kong= '======================================================================'
    f.write('\n'+kong+'\n'+time_+nowQI+buyHao+money_+result+str(d))
    f.close()

#  ======================================================================
moreBeishu=0
def readFile():
    global moreBeishu
    # get_open_phase = {"differtime":507,'myBuyMoney':1233,"next_phase":"20180413037","open_phase":"20180413036","open_result":["7","4","9","8","8"]}
    
    f = open('historyMoney.txt','r',encoding='UTF-8')
    lines =f.readlines()
    f.close()
    if len(lines)>0:
        
        get_open_phase = lines[-1]
        _getsSelfData = getsSelfData()
        aa =get_open_phase.replace('\'','\"')
        get_open_phase =json.loads(aa)
        # if True:
        if str(get_open_phase['next_phase']) == _getsSelfData['lottery']['bjpk10']['open_phase']:
            # isWinning =set(get_open_phase['historyLottery']) &set(_getsSelfData['lottery']['bjpk10']['open_result'][0])
            kaijiang_ge = _getsSelfData['lottery']['bjpk10']['open_result'][0]
            buyhistory =get_open_phase['historyLottery']
            if kaijiang_ge in buyhistory:
                f = open('isWinning.txt','a',encoding='UTF-8')
                f.write(str(moreBeishu)+'倍中'+'\n')
                moreBeishu =0
                f.close()
                return  0
            else:
                if get_open_phase['myBuyMoney']=='':
                    return  0
                else:
                    f = open('isWinning.txt','a',encoding='UTF-8')
                    if get_open_phase['myBuyMoney'] ==2 or get_open_phase['myBuyMoney'] =='2':
                        print("从头再来")
                        # get_open_phase['myBuyMoney']=-1

                    r = get_open_phase['myBuyMoney']+1  
                    

                    moreBeishu =r
                    f.write('当前:挂'+str(r-1)+'倍\n')
                    f.close()
                    return r
        else:
            return  0

    return 0
    
#  ======================================================================
def isFile():
    if  os.path.exists(r'historyMoney.txt'):
        pass
    else:
        print('     ')
        f = open('historyMoney.txt','w',encoding='UTF-8')
        f = open('isWinning.txt','w',encoding='UTF-8')
        f.close()
#  ======================================================================        
# 模拟下单
ISBUY=True
def placeOrder():
    isFile()
    global ISBUY
    if not ISBUY:
        m =time.localtime().tm_min
        # 234   789 回复
        if m%10>=2 and m%10<=4 or m%10>=7 and m%10<=9:
            # 整点后回复
            ISBUY = True
    if time.localtime().tm_hour<9:
        print('休息中', time.strftime('%Y-%m-%d %H:%M:%S'))
        return
    time.sleep(1)
    if ISBUY and is_timebuy():
        urls_bets = 'http://main.by189.cn/bets'
        # 提交的参数
        params_bets={
            'code':'bjpk10',
            'drawNumber':now_oder_qihao(),
        }
        
        # 拿到数据决定买什么的参数
        # get_jihua_parms = jihua_2008cai.get_url()
        
        get_jihua_parms = shenjihua.get_links()
        # get_jihua_parms = jihuaapk.get_info()18- 01k-feng-04----06 feng18   
        orders = get_jihua_parms['buyParms']
        historyLottery_will = get_jihua_parms['will_buyhao']
        myMoney = readFile()
        # 二次拼接成接口需要的形式
        print('下注========',pow(2, myMoney)*YICITOU)
        
        for idnex, item in   enumerate(orders):
            for  kk in item:
                listData = 'orders'+'['+str(idnex)+']'+'['+kk+']'# 拼接出来key
                item['money'] =1
                params_bets[listData]=item[kk] 
        params_bets1 =params_bets   # 下单数据    
        requests_cookie.cookies=get_cookie()
        html = requests_cookie.post(urls_bets,data=params_bets1,headers=headers_bets)
        print('print========myMoney',params_bets1)
        JSON_data_History= json.loads(html.text)
        if JSON_data_History['status']==1:
            getNowData = getsSelfData()
            
            getNowData['lottery']['bjpk10']['myBuyMoney']=myMoney
            getNowData['lottery']['bjpk10']['historyLottery']=historyLottery_will
            writeFile(getNowData['lottery']['bjpk10'])
            ISBUY = False
            print('下单成功：'+time.strftime('%Y-%m-%d %H:%M:%S'))
            print('下单money：'+JSON_data_History['money'])
            return
        else:
            print('失败了================'+JSON_data_History['info'])
            if JSON_data_History['info']=='单笔投注金额不能大于':
                login(1)
    else:
        if not is_timebuy():
            print('等着吧---不在时间内',time.strftime('%Y-%m-%d %H:%M:%S'))

        elif not ISBUY:
             print('等着吧---买过了',time.strftime('%Y-%m-%d %H:%M:%S'))
        else:
            pass     
        
#  ======================================================================
def is_timebuy():
	now = time.localtime()
	h = now.tm_hour
	m = now.tm_min
	#s = now.tm_sec
	if h>=9:
		# 5min 18- 01k-feng-04----06 feng18
		if m%10>=0 and m%10<=1 or m%10>=5 and m%10<=6:
            # 0-1 5-6
            # 234  6789
			return True
	else:
		pass
		
	return False 

def hongbao():
    html = requests_cookie.post(urls,data=params,headers=headers)    
#  ======================================================================
def get_cookie():
    if cookie_yang.load_cookies_from_lwp(filename):
         return cookie_yang.load_cookies_from_lwp(filename)
    else:
        print('无cookie')	
        return
    
#  ======================================================================
if  __name__ =='__main__':
    # writeFile()
    # writeFile()
    login(2)
    time.sleep(5)
    # placeOrder()
    while True:
        pass
        try:
            placeOrder()
            time.sleep(59)
        except Exception as e:
            print(e)    
   
   
    