const INPUT: &str = include_str!("./inputs/001.input.txt");

fn main() {
    let destination_floor = get_destination_floor(INPUT);
    println!("Destination Floor: {}", destination_floor);

    let basement_position = get_basement_position(INPUT);
    println!("First position in basement: {}", basement_position);
}

fn get_destination_floor(input: &str) -> i32 {
    let mut floor = 0;

    for char in input.chars() {
        match char {
            '(' => floor += 1,
            ')' => floor -= 1,
            _ => eprintln!("Invalid character: {}", char),
        }
    }

    return floor;
}

fn get_basement_position(input: &str) -> i32 {
    let mut floor = 0;

    for (position, char) in input.chars().enumerate() {
        match char {
            '(' => floor += 1,
            ')' => floor -= 1,
            _ => eprintln!("Invalid character: {}", char),
        }

        if floor < 0 {
            return position as i32 + 1;
        }
    }

    return -1;
}
