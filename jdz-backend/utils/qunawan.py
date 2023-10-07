from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
# from webdriver_manager.chrome import ChromeDriverManager
# from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By
import time
import json
def save_to_json(data, filename):
    with open(filename, 'w') as file:
        # writer = csv.writer(file)
        # writer.writerows(data)
        json.dump(data, file)

def run_browser():
    options = webdriver.ChromeOptions()
    options.add_argument('ignore-certificate-errors')
    # service= ChromeService(executable_path='/pup-website/chromedriver')
    # browser = webdriver.Chrome(service=service)
    browser = webdriver.Chrome()
    browser.get('https://www.qunar.com/')
    # 设置等待时间10s
    wait = WebDriverWait(browser, 10)
    # 设置判断条件：等待id='kw'的元素加载完成
    input = wait.until(EC.presence_of_element_located((By.ID, 'header_search_input')))
    # 在关键词输入：关键词
    input.send_keys('景德镇热门景点')

    search = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, 'icon-search')))
    ActionChains(browser).click(search).perform()
    # 关闭浏览器
    time.sleep(2)
    
    browser.switch_to.window(browser.window_handles[1])
    wait.until(EC.element_to_be_clickable((By.CLASS_NAME, 'sight_item_do')))
    links = browser.find_elements(By.CLASS_NAME, 'sight_item_do')
    costs = browser.find_elements(By.CSS_SELECTOR, '.sight_item_price em')
    # area_data = [["title", "data_from", "cost", "description", "tags", "introduction", "address", "open_time", "comments"]]
    area_data = []
    for lk in range(0, 1):
        cost = costs[lk].text
        ActionChains(browser).click(links[lk]).perform()
        if(len(browser.window_handles)<2):
            break
        browser.switch_to.window(browser.window_handles[2])
        wait.until(EC.presence_of_element_located((By.CLASS_NAME, 'mp-charact-desc')))
        description = browser.find_element(By.CSS_SELECTOR, '.mp-charact-desc p').text
        title = browser.find_element(By.CSS_SELECTOR, '.mp-description-name').text
        try:
          tags = browser.find_element(By.CSS_SELECTOR, '.mp-description-level').text
        except NoSuchElementException:
          tags= ''
        introduction = browser.find_element(By.CSS_SELECTOR, '.mp-description-onesentence').text
        address = browser.find_element(By.CSS_SELECTOR, '.mp-description-address').text
        open_time = browser.find_element(By.CSS_SELECTOR, '.mp-charact-desc p').text
        comments = browser.find_elements(By.CSS_SELECTOR, '.mp-comments-item')
        data_from = "https://piao.qunar.com/ticket/list.htm?keyword=%E6%99%AF%E5%BE%B7%E9%95%87&region=null&from=mps_search_suggest"
        comments_arr = [ ]
        for c in comments:
            comments_username = c.find_element(By.CSS_SELECTOR, '.mp-comments-username').text
            comments_time = c.find_element(By.CSS_SELECTOR, '.mp-comments-time').text
            comments_txt = c.find_element(By.CSS_SELECTOR, '.mp-comments-desc').text
            comments_imgs = c.find_elements(By.CSS_SELECTOR, '.mp-comments-img-item .mp-img')
            imgs = []
            for im in comments_imgs:
                imgs.append(im.get_attribute('data-original-src'))
            comments_arr.append({
                "username":comments_username,
                "time":comments_time,
                "txt":comments_txt,
                "imgs":imgs,
                "comment_from": "去哪玩"
            })
        # area_data.append([title,data_from,cost,description,tags,introduction,address,open_time,comments_arr])
        area_data.append({
            "title": title,
            "data_from": data_from,
            "cost": cost,
            "description": description,
            "tags": tags,
            "introduction": introduction,
            "address": address,
            "open_time": open_time,
            "comments_arr": comments_arr
        })
        browser.close()
        browser.switch_to.window(browser.window_handles[1])

    save_to_json(area_data, '../webdata/qunar.json')
    # 执行完成后不关闭浏览器
    input("按任意键继续...")
    # 关闭浏览器
    browser.quit()

run_browser()
