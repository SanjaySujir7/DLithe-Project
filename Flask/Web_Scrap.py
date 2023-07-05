from selenium import webdriver
from selenium.webdriver.common.by import By

Driver = webdriver.Chrome()
Driver.fullscreen_window()

Driver.get('https://www.w3schools.com/bootstrap/bootstrap_templates.asp')

Element = Driver.find_elements(By.TAG_NAME,'p')

for all in Element:
    print(all.get_attribute('innerText'))
    
