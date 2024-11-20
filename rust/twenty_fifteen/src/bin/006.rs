use lazy_static::lazy_static;
use regex::Regex;

const INPUT: &str = include_str!("../../../inputs/2015.006.txt");

fn main() {
    println!("Light count: {}", process_ixns());
    println!("Total brightness: {}", 0);
}

fn count_lights(grid: &Vec<Vec<bool>>) -> usize {
    grid.iter()
        .map(|row| row.iter().copied().filter(|cell| *cell).count())
        .sum()
}

lazy_static! {
    static ref IXN_REGEX: Regex = Regex::new(
        r"(?P<action>turn on|turn off|toggle) (?P<x1Value>\d+),(?P<y1Value>\d+) through (?P<x2Value>\d+),(?P<y2Value>\d+)"
    ).unwrap();
}

struct Instruction {
    action: String,
    x1: i32,
    x2: i32,
    y1: i32,
    y2: i32,
}

fn get_instruction_components(instruction: &str) -> Option<Instruction> {
    let caps = IXN_REGEX.captures(instruction)?;

    Some(Instruction {
        action: caps["action"].to_string(),
        x1: caps["x1Value"].parse().ok()?,
        x2: caps["x2Value"].parse().ok()?,
        y1: caps["y1Value"].parse().ok()?,
        y2: caps["y2Value"].parse().ok()?,
    })
}

fn process_ixns() -> usize {
    let mut grid = vec![vec![false; 1000]; 1000];

    for ixn in INPUT.lines() {
        if let Some(components) = get_instruction_components(ixn) {
            for i in components.x1..=components.x2 {
                for j in components.y1..=components.y2 {
                    let i = i as usize;
                    let j = j as usize;

                    match components.action.as_str() {
                        "turn on" => grid[i][j] = true,
                        "turn off" => grid[i][j] = false,
                        "toggle" => grid[i][j] = !grid[i][j],
                        _ => println!("default case hit: {} {}", i, j),
                    }
                }
            }
        } else {
            println!("NO MATCH");
        }
    }

    count_lights(&grid)
}
