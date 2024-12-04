const INPUT: &str = include_str!("../../../inputs/2024.002.txt");

fn main() {
    let reports: Vec<Vec<i32>> = INPUT
        .lines()
        .map(|line| {
            line.split_whitespace()
                .map(|num| num.parse::<i32>().unwrap())
                .collect()
        })
        .collect();

    let safe_report_count = reports
        .iter()
        .filter(|report| is_safe_report(report))
        .count();

    println!("There are {} safe reports", safe_report_count);

    let dampened_safe_report_count = reports
        .iter()
        .filter(|report| check_all_perms(report))
        .count();

    println!(
        "There are {} safe reports after dampening",
        dampened_safe_report_count
    );
}

fn is_safe_report(report: &[i32]) -> bool {
    if report.len() <= 1 {
        return true;
    }

    let is_increasing = report
        .windows(2)
        .all(|pair| pair[0] < pair[1] && pair[0] + 3 >= pair[1]);

    if is_increasing {
        true
    } else {
        report
            .windows(2)
            .all(|pair| pair[0] > pair[1] && pair[0] - 3 <= pair[1])
    }
}

fn get_dampened_permutations(report: &[i32]) -> Vec<Vec<i32>> {
    let mut permutations = Vec::new();
    let n = report.len();
    permutations.push(report.to_vec());

    if n <= 1 {
        return permutations;
    }

    for skip_idx in 0..report.len() {
        permutations.push(
            report
                .iter()
                .enumerate()
                .filter(|&(i, _)| i != skip_idx)
                .map(|(_, &x)| x)
                .collect(),
        )
    }

    permutations
}

fn check_all_perms(report: &[i32]) -> bool {
    let perms = get_dampened_permutations(report);

    perms.iter().any(|perm| is_safe_report(perm))
}
