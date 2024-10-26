use std::collections::HashMap;

const INPUT: &str = include_str!("./inputs/003.input.txt");

fn main() {
    let gifted_houses_result_v1 = get_houses_gifted(INPUT, None);
    println!(
        "V1 Gifted Houses: {}",
        gifted_houses_result_v1.unique_house_gifted_count
    );

    let gifted_houses_result_v2 = get_houses_gifted_v2(INPUT);
    println!("V2 Gifted Houses: {}", gifted_houses_result_v2)
}

struct Coordinates {
    x: i32,
    y: i32,
}

type VisitedHouses = HashMap<i32, HashMap<i32, i32>>;

struct GiftedHousesResult {
    unique_house_gifted_count: i32,
    visited_houses: VisitedHouses,
}

fn get_houses_gifted(
    input: &str,
    prev_visited_houses: Option<VisitedHouses>,
) -> GiftedHousesResult {
    let mut current_coordinates = Coordinates { x: 0, y: 0 };
    let mut unique_house_gifted_count = if prev_visited_houses.is_some() { 0 } else { 1 };
    let mut visited_houses = prev_visited_houses.unwrap_or_else(|| {
        let mut inner_map = HashMap::new();
        inner_map.insert(0, 1);

        let mut outer_map = HashMap::new();
        outer_map.insert(0, inner_map);

        outer_map
    });

    for char in input.chars() {
        match char {
            '^' => current_coordinates.y += 1,
            'v' => current_coordinates.y -= 1,
            '>' => current_coordinates.x += 1,
            '<' => current_coordinates.x -= 1,
            _ => eprintln!("Invalid character: {}", char),
        }

        if let Some(inner_map) = visited_houses.get_mut(&current_coordinates.y) {
            if let Some(count) = inner_map.get_mut(&current_coordinates.x) {
                *count += 1;
            } else {
                unique_house_gifted_count += 1;
                inner_map.insert(current_coordinates.x, 1);
            }
        } else {
            unique_house_gifted_count += 1;
            let mut inner_map = HashMap::new();
            inner_map.insert(current_coordinates.x, 1);
            visited_houses.insert(current_coordinates.y, inner_map);
        }
    }

    return GiftedHousesResult {
        unique_house_gifted_count,
        visited_houses,
    };
}

fn get_houses_gifted_v2(input: &str) -> i32 {
    let santa_steps: String = input
        .chars()
        .enumerate()
        .filter(|&(index, _)| index == 0 || index % 2 == 0)
        .map(|(_, c)| c)
        .collect();
    let robo_santa_steps: String = input
        .chars()
        .enumerate()
        .filter(|&(index, _)| index != 0 && index % 2 != 0)
        .map(|(_, c)| c)
        .collect();

    let santa_results = get_houses_gifted(&santa_steps, None);
    let robo_santa_results =
        get_houses_gifted(&robo_santa_steps, Some(santa_results.visited_houses));

    return santa_results.unique_house_gifted_count + robo_santa_results.unique_house_gifted_count;
}
