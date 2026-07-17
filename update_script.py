import json

new_committees_text = """
Patron
Dr. A. M. SherryDirector, IIIT, Lucknow, India
Honorary Chair
Prof. Rajkumar Buyya, The University of Melbourne, Melbourne, Australia
Prof. Dipankar Dasgupta, The University of Memphis, Memphis, USA
General Chair
Prof. K. K. Pattanaik, ABV-Indian Institute of Information Technology and Management, Gwalior, India
Dr. Anshul Verma, Banaras Hindu University, Varanasi, India
Program Chair
Dr. Saurabh Shukla, IIIT, Lucknow, India
Convener
Dr. Rahul Kumar Verma, IIIT, Lucknow, India
Organizing Secretary
Dr. Shubhra Jain, IIIT, Lucknow, India
Dr. Niharika Anand, IIIT, Lucknow, India
Dr. Pradeepika Verma, Bennett University, Greater Noida, India
Track Chair
Prof. Himanshu, Punjabi University, Patiala, India
Prof. Karm Veer Arya, ABV-Indian Institute of Information Technology and Management, Gwalior, India
Prof. Madan Mohan Tripathi, Delhi Technological University, Delhi, India
Prof. Nanhay Singh, Netaji Subhas University of Technology, New Delhi, India
Prof. P. K. Singh, ABV-Indian Institute of Information Technology and Management, Gwalior, India
Dr. Andrea Visconti, University of Milan, Italy
Dr. Bhaskar Biswas, Indian Institute of Technology (BHU), Varanasi, India
Dr. Binod Kumar Singh, National Institute of Technology, Jamshedpur, India
Dr. Divakar Singh Yadav, National Institute of Technology, Hamirpur, India
Dr. Lalit Garg, University of Malta, Malta
Dr. Petros Nicopolitidis, Aristotle University of Thessaloniki, Greece
Dr. Rakan Aldmour, Staffordshire University, United Kingdom
Dr. Sukomal Pal, Indian Institute of Technology (BHU), Varanasi, India
Dr. W Wilfred Godfrey, ABV-Indian Institute of Information Technology and Management, Gwalior, India
Dr. Prashant Singh Rana, Thapar Institute of Engineering & Technology, India
Dr. Harish Sharma, Rajasthan Technical University, Kota, India
Dr. Puneet Misra, University of Lucknow, India
Dr. Sachi Nandan Mohanty, College of Engineering Pune, India
Dr. Pradeepika Verma, Bennett University, Greater Noida, India
Organizing Committee
Dr. Shubhra Jain, IIIT, Lucknow, India
Dr. Ankita Srivastava, IIIT, Lucknow, India
Dr. Soumendu Chakraborty, IIIT, Lucknow, India
Dr. Deepak Kumar Singh, IIIT, Lucknow, India
Dr. Deepshikha Agarwal, IIIT, Lucknow, India
Dr. Niharika Anand, IIIT, Lucknow, India
Dr. Varun Sharma, IIIT, Lucknow, India
Dr. Madhurima Datta, IIIT, Lucknow, India
Dr. Sirsendu Shekhar Barman, IIIT, Lucknow, India
Dr. Saurabh Shukla, IIIT, Lucknow, India
Dr. Gaurav Baranwal, Banaras Hindu University, Varanasi, India
Dr. S. N. Chaurasia, Banaras Hindu University, Varanasi, India
Dr. Awadhesh Kumar, MMV, Banaras Hindu University, Varanasi, India
Dr. S. Suresh, National Institute of Technology, Kurukshetra, India
Publication Chair
Dr. Sanjeev Sharma, Indian Institute of Information Technology, Pune, India
Dr. Vibhav Prakash Singh, Motilal Nehru National Institute of Technology, Allahabad, India
Dr. Dharmendra Prasad Mahato, National Institute of Technology, Hamirpur, India
Publicity Chair
Dr. Koushlendra Kumar Singh, National Institute of Technology, Jamshedpur, India
Dr. Vijay Bhaskar Semwal, Maulana Azad National Institute of Technology, Bhopal, India
Dr. Bhawana Rudra, National Institute of Technology, Karnataka, India
Volume Editors
Dr. Anshul Verma, Banaras Hindu University, Varanasi, India
Dr. Rahul Kumar Verma, Indian Institute of Information Technology, Lucknow, India
Dr. Pradeepika Verma, Bennett University, Greater Noida, India
Prof. K. K. Pattanaik, ABV-Indian Institute of Information Technology and Management, Gwalior, India
Prof. Rajkumar Buyya, The University of Melbourne, Melbourne, Australia
Prof. Dipankar Dasgupta, The University of Memphis, Memphis, USA
"""

with open('/home/vikas/WebstormProjects/antic/committee.json', 'r') as f:
    orig_data = json.load(f)

photos = {}
for c in orig_data['committees']:
    for m in c['members']:
        if 'name' in m and 'photo' in m and m['photo']:
            photos[m['name'].strip()] = m['photo']

def get_photo(name):
    if name in photos:
        return photos[name]
    for k, v in photos.items():
        if k.lower() == name.lower():
            return v
        if k.replace(' ', '').lower() == name.replace(' ', '').lower():
            return v
    return ""

committees = []
current_committee = None
members = []

lines = new_committees_text.strip().split('\n')
for line in lines:
    line = line.strip()
    if not line:
        continue
    if ',' not in line:
        if current_committee:
            committees.append({
                "committeeTitle": current_committee,
                "members": members
            })
        current_committee = line
        members = []
    else:
        designation = ""
        if "SherryDirector" in line:
            line = line.replace("SherryDirector", "Sherry")
            designation = "Director"
        
        parts = line.split(',', 1)
        name = parts[0].strip()
        affiliation = parts[1].strip()
        
        photo = get_photo(name)
        
        member = {
            "name": name,
            "affiliation": affiliation,
            "designation": designation,
            "photo": photo
        }
        members.append(member)

if current_committee:
    committees.append({
        "committeeTitle": current_committee,
        "members": members
    })

advisory_board = next((c for c in orig_data['committees'] if c['committeeTitle'] == 'Advisory Board'), None)
tpc = next((c for c in orig_data['committees'] if c['committeeTitle'] == 'Technical Program Committee'), None)

order = [
    "Patron",
    "Honorary Chair",
    "Advisory Board",
    "General Chair",
    "Program Chair",
    "Convener",
    "Organizing Secretary",
    "Track Chair",
    "Organizing Committee",
    "Publication Chair",
    "Publicity Chair",
    "Technical Program Committee",
    "Volume Editors"
]

dict_committees = {c['committeeTitle']: c for c in committees}
if advisory_board:
    dict_committees['Advisory Board'] = advisory_board
if tpc:
    dict_committees['Technical Program Committee'] = tpc
    
for title in ["Track Chair", "Publication Chair", "Publicity Chair", "Organizing Committee", "Volume Editors"]:
    if title in dict_committees:
        dict_committees[title]['view'] = 4

final_data = []
for title in order:
    if title in dict_committees:
        final_data.append(dict_committees[title])
        
output = {"committees": final_data}
with open('/home/vikas/WebstormProjects/antic/committee.json', 'w') as f:
    json.dump(output, f, indent=2)

print("Updated committee.json")
