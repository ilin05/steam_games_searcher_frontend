import json

def read_json_from_file(file_path):

    with open(file_path, 'r', encoding='utf-8') as rfile:
        data = json.load(rfile)
    return data

def process_data(data):
    processd = []

    for game_id,game_info in data.items():
        item = {"name":"Game A","estimated_owners":"20"}
        item["estimated_owners"] = game_info["estimated_owners"].split()[2]
        item["name"] = game_info["name"]
        processd.append(item)
    return processd

    

def write_json_to_file(data, file_path):
    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=4)

if __name__ == "__main__":

    file_path = "games.json"
    data = read_json_from_file(file_path)
    processed_data = process_data(data)
    write_json_to_file(processed_data, "newgames.json")
