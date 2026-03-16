terraform {
    required_providers {
        aws = {
            source = "hashicorp/aws"
            version = "~> 5.0"
        }
    }
}

provider "aws" {
    region = "ap-south-1"
}

resource "aws_security_group" "todo_sg" {
    name = "todo-sg"
    description = "Allow SSH and HTTP"

    ingress {
        from_port = 22
        to_port = 22
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        from_port = 3000
        to_port = 3000
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
}

resource "aws_key_pair" "todo_key" {
    key_name = "todo-key"
    public_key = file("~/.ssh/todo-key.pub")
}

resource "aws_instance" "todo_server" {
    ami = "ami-0f58b397bc5c1f2e8"
    instance_type = "t2.micro"
    vpc_security_group_ids = [aws_security_group.todo_sg.id]
    key_name = aws_key_pair.todo_key.key_name

    tags = {
        Name = "todo-server"
    }
}

output "server_ip" {
    value = aws_instance.todo_server.public_ip
    description = "Public IP address of the EC2 instance"
}