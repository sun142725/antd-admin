#!/usr/bin/env bash
# author:sun142725

##############  颜色函数
color_black(){
    echo -e "\033[30m $1 \033[0m"
}
color_red(){
    echo -e "\033[31m $1 \033[0m"
}
color_green(){
    echo -e "\033[32m $1 \033[0m"
}
color_yellow(){
    echo -e "\033[33m $1 \033[0m"
}
color_blue(){
    echo -e "\033[34m $1 \033[0m"
}
color_violet(){
    echo -e "\033[35m $1 \033[0m"
}

color_sky_blue(){
    echo -e "\033[37m $1 \033[0m"
}
source_route="/c/Users/jihon/Desktop/own/antd-admin/admin-web/*"
target_route="/c/Users/jihon/Desktop/own/egg-first/app/public/admin-web"

function copyCode(){
    cp -r $source_route $target_route
    color_sky_blue "copy成功"
}

function copyBuild(){
    read -p "定将$source_route copy至 $target_route(y/n)": bool
    if [[ $bool = "y" || $bool = "Y" ]]
    then
        color_red "delete  $target_route/*"
        rm -rf $target_route/*
        copyCode
    fi
}
copyBuild
exit
