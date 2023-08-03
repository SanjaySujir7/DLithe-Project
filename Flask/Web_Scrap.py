from selenium import webdriver
from selenium.webdriver.common.by import By
import csv
from time import sleep


# from selenium.webdriver.chrome.options import Options

# Chrome_Option = Options()
# Chrome_Option.add_experimental_option('detach',True)

# Driver = webdriver.Chrome()

# Driver.get('http://127.0.0.1:5000/admin')

# sleep(20)
# Table_Head = Driver.find_element(By.TAG_NAME,'thead')
# Table_Headings = Table_Head.find_elements(By.TAG_NAME,'th')

# Table_Body = Driver.find_element(By.TAG_NAME,'tbody')
# Table_Body_Row = Table_Body.find_elements(By.TAG_NAME,'tr')

# Headings_List = []
# Body_List = []


# for headings in Table_Headings:
#     Headings_List.append(headings.get_attribute('innerText'))
    
# for Contents in Table_Body_Row:
#     table_content = Contents.find_elements(By.TAG_NAME,'td')
#     temp_List = []
    
#     for all_contents in table_content:
#         temp_List.append(all_contents.get_attribute('innerText'))
        
#     Body_List.append(temp_List)
    

        
# with open('Scrap.csv','w',newline="") as file:
#     Writer = csv.writer(file)
#     Writer.writerow(Headings_List[1:])
#     Writer.writerows(Body_List)
