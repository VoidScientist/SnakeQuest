import pygame
import random as rd

SCREEN_WIDTH = 800
SCREEN_HEIGHT = 800

TILES = 16
TILE_WIDTH = SCREEN_WIDTH // TILES
TILE_HEIGHT = SCREEN_HEIGHT // TILES

snake = [(rd.randrange(0, TILES-1),rd.randrange(0, TILES-1))]
snake_direction = (0,0)
snake_len = 1

wall_num = 0
walls = [(rd.randrange(0, TILES-1),rd.randrange(0, TILES-1)) for _ in range(wall_num)]

apple_num = 2
apples = [(rd.randrange(0, TILES-1),rd.randrange(0, TILES-1)) for _ in range(apple_num)]

cv = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))

pygame.init()

score_font = pygame.font.SysFont("Consolas", 30)

framerate = 10
pygame.time.set_timer(69, int(1/framerate*1000))

def draw_grid():

    for i in range(1, SCREEN_WIDTH // TILES):

        pygame.draw.line(cv, (150,150,150), (0, i*TILE_HEIGHT), (SCREEN_WIDTH, i*TILE_HEIGHT))

        pygame.draw.line(cv, (150,150,150), (i*TILE_WIDTH, 0), (i*TILE_WIDTH, SCREEN_HEIGHT))    

def parse_input(key):
    global snake_direction

    if key == pygame.K_z or key == pygame.K_UP:
        snake_direction = (0,-1)

    if key == pygame.K_q or key == pygame.K_LEFT:
        snake_direction = (-1,0)

    if key == pygame.K_d or key == pygame.K_RIGHT:
        snake_direction = (1,0)

    if key == pygame.K_s or key == pygame.K_DOWN:
        snake_direction = (0,1)

def move(old_pos, movement):
    return (old_pos[0] + movement[0], old_pos[1] + movement[1])

def parse_events():

    for event in pygame.event.get():

        match event.type:

            case pygame.QUIT:

                pygame.quit()
                break

            case pygame.KEYDOWN:

                parse_input(event.key)

            case 69:
                
                snake.insert(0, move(snake[0], snake_direction))

                while len(snake) > snake_len:
                    snake.pop(-1)

def draw_elements():

    for y in range(SCREEN_HEIGHT // TILE_HEIGHT):
        for x in range(SCREEN_WIDTH // TILE_WIDTH):
            if (x, y) in snake:
                contrast = 0 if (x,y) == snake[0] else 100
                pygame.draw.rect(cv, (0,200 - contrast,0), (x * TILE_WIDTH, y * TILE_HEIGHT, TILE_WIDTH+1, TILE_HEIGHT+1))
            elif (x, y) in apples:
                pygame.draw.rect(cv, (255,0,0), (x * TILE_WIDTH, y * TILE_HEIGHT, TILE_WIDTH+1, TILE_HEIGHT+1))
            elif (x, y) in walls:
                pygame.draw.rect(cv, (255,200,0), (x * TILE_WIDTH, y * TILE_HEIGHT, TILE_WIDTH+1, TILE_HEIGHT+1))

def handle_collisions():
    global apples, snake_len, walls

    if snake[0][0] < 0 or snake[0][0] >= TILES or snake[0][1] < 0 or snake[0][1] >= TILES or snake[0] in snake[1:]:
        print("you hit a world border or yourself!")
        pygame.quit()
        return False
    
    for i, pos in enumerate(walls):
        if pos == snake[0]:
            snake_len -= 1
            
            if snake_len == 0:
                print("died to inner walls")
                pygame.quit()
                return False

            walls.pop(i)
            walls += [(rd.randrange(0,TILES-1), rd.randrange(0, TILES-1))]

    for i, pos in enumerate(apples):
        if pos == snake[0]:
             snake_len += 1
             apples.pop(i)
             apples += [(rd.randrange(0,TILES-1), rd.randrange(0, TILES-1))]

    return True

while True:
    pygame.draw.rect(cv, (20,20,40), (0,0, SCREEN_WIDTH, SCREEN_HEIGHT))
    
    draw_grid()
    draw_elements()
    parse_events()

    score_text = score_font.render(f"Score: {snake_len}", True, (255,255,255))
    cv.blit(score_text, (20,20))
    
    if not handle_collisions():
        break
    
    pygame.display.update()


