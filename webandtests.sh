#gnome-terminal --tab -- bash -c "npm start; bash" &
#gnome-terminal --tab -- bash -c "npm test; bash" &

gnome-terminal  --tab -e "npm start" &
gnome-terminal  --tab -e "npm test" &
