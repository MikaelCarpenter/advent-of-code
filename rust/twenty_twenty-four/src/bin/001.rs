const INPUT: &str = include_str!("../../../inputs/2024.001.txt");

fn main() {
    let (left_list, right_list) = separate_lists();

    let mut total_distance = 0;

    for (l_val, r_val) in left_list.iter().zip(right_list.iter()) {
        total_distance += (r_val - l_val).abs();
    }

    println!("Total distance: {}", total_distance);

    let mut similarity_score = 0;

    for l_val in left_list.iter() {
        let first_pos = right_list.partition_point(|&v| v < *l_val);
        if first_pos < right_list.len() && right_list[first_pos] == *l_val {
            update_sim_score(&right_list, first_pos, l_val, &mut similarity_score);
        }
    }

    println!("Similarity score: {}", similarity_score);
}

fn separate_lists() -> (Vec<i64>, Vec<i64>) {
    let mut left_list: Vec<i64> = Vec::new();
    let mut right_list: Vec<i64> = Vec::new();

    for line in INPUT.lines() {
        let line_pair: Vec<&str> = line.split("   ").collect();

        let left_num = line_pair[0].parse().unwrap();
        let right_num = line_pair[1].parse().unwrap();

        left_list.push(left_num);
        right_list.push(right_num);
    }

    left_list.sort();
    right_list.sort();

    return (left_list, right_list);
}

fn update_sim_score(right_list: &[i64], pos: usize, val: &i64, score: &mut i64) {
    if pos >= right_list.len() {
        return;
    }
    if right_list[pos] == *val {
        *score += val;
        update_sim_score(right_list, pos + 1, val, score);
    }
}
